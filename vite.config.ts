import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import JSZip from 'jszip';
import type { Plugin } from 'vite';
import { defineConfig, loadEnv } from 'vite';

/**
 * Vite plugin: processes KMZ files server-side.
 * Endpoint: GET /api/kmz/:filename.kmz
 * Returns: { imageUrl: string, bounds: [[s,w],[n,e]] }
 * Images are cached to public/uploads/kmz-cache/ to avoid re-processing.
 */
function kmzProcessorPlugin(): Plugin {
  const KMZ_DIR = path.resolve('./public/uploads/kmz');
  const CACHE_DIR = path.resolve('./public/uploads/kmz-cache');

  return {
    name: 'kmz-processor',
    configureServer(server) {
      server.middlewares.use('/api/kmz', async (req, res) => {
        try {
          const filename = (req.url ?? '').replace(/^\//, '');
          if (!filename.endsWith('.kmz')) {
            res.statusCode = 400;
            res.end(JSON.stringify({ error: 'Only .kmz files are supported' }));
            return;
          }

          const baseName = path.basename(filename, '.kmz');

          // Ensure cache directory exists
          if (!fs.existsSync(CACHE_DIR)) fs.mkdirSync(CACHE_DIR, { recursive: true });

          const cacheJsonPath = path.join(CACHE_DIR, `${baseName}.json`);

          // Serve from cache if available
          if (fs.existsSync(cacheJsonPath)) {
            const cached = fs.readFileSync(cacheJsonPath, 'utf-8');
            res.setHeader('Content-Type', 'application/json');
            res.setHeader('Cache-Control', 'public, max-age=86400');
            res.end(cached);
            console.log(`[KMZ] Served from cache: ${baseName}`);
            return;
          }

          const kmzPath = path.join(KMZ_DIR, filename);
          if (!fs.existsSync(kmzPath)) {
            res.statusCode = 404;
            res.end(JSON.stringify({ error: `File not found: ${filename}` }));
            return;
          }

          console.log(`[KMZ] Processing: ${filename} (${(fs.statSync(kmzPath).size / 1024 / 1024).toFixed(1)} MB) ...`);

          const data = fs.readFileSync(kmzPath);
          const zip = await JSZip.loadAsync(data);

          // Find KML file
          const kmlFile = Object.values(zip.files).find(f => !f.dir && f.name.toLowerCase().endsWith('.kml'));
          if (!kmlFile) throw new Error('KML file not found in KMZ');
          const kmlText = await kmlFile.async('text');

          // Parse ALL GroundOverlay blocks
          const overlayBlocks = [...kmlText.matchAll(/<GroundOverlay[\s\S]*?<\/GroundOverlay>/gi)];
          if (overlayBlocks.length === 0) throw new Error('No GroundOverlay found in KML');

          console.log(`[KMZ] Found ${overlayBlocks.length} GroundOverlays`);

          // Helper: extract tag value from a block
          const getVal = (block: string, tag: string): number => {
            const m = block.match(new RegExp(`<${tag}[^>]*>\\s*([\\d.\\-]+)\\s*</${tag}>`, 'i'));
            return m ? parseFloat(m[1]) : 0;
          };

          // Parse all overlays
          type Overlay = { href: string; north: number; south: number; east: number; west: number; level: number };
          const overlays: Overlay[] = overlayBlocks.map(m => {
            const block = m[0];
            const href = (block.match(/<href>([\s\S]*?)<\/href>/i)?.[1] ?? '').trim().replace(/\\/g, '/');
            // Extract zoom level from filename (e.g. _L3_, _L4_, _L5_)
            const levelMatch = href.match(/_L(\d+)_/);
            const level = levelMatch ? parseInt(levelMatch[1]) : 99;
            return {
              href,
              north: getVal(block, 'north'),
              south: getVal(block, 'south'),
              east:  getVal(block, 'east'),
              west:  getVal(block, 'west'),
              level,
            };
          });

          // Use the lowest zoom level available (e.g. L3 gives fewest tiles, best overview)
          const minLevel = Math.min(...overlays.map(o => o.level));
          const targetOverlays = overlays.filter(o => o.level === minLevel);
          console.log(`[KMZ] Using level L${minLevel} → ${targetOverlays.length} tiles`);

          // Subfolder per KMZ to avoid name collisions
          const tileDir = path.join(CACHE_DIR, baseName);
          if (!fs.existsSync(tileDir)) fs.mkdirSync(tileDir, { recursive: true });

          // Extract each tile image
          const layers: Array<{ imageUrl: string; bounds: [[number, number], [number, number]] }> = [];

          for (const overlay of targetOverlays) {
            const zipEntry = zip.files[overlay.href]
              ?? Object.values(zip.files).find(f => !f.dir && f.name.endsWith(overlay.href.split('/').pop() ?? ''));
            if (!zipEntry) {
              console.warn(`[KMZ] Tile not found in zip: ${overlay.href}`);
              continue;
            }

            const tileFileName = overlay.href.split('/').pop()!;
            const tilePath = path.join(tileDir, tileFileName);

            if (!fs.existsSync(tilePath)) {
              const buf = await zipEntry.async('nodebuffer');
              fs.writeFileSync(tilePath, buf);
            }

            layers.push({
              imageUrl: `/uploads/kmz-cache/${baseName}/${tileFileName}`,
              bounds: [[overlay.south, overlay.west], [overlay.north, overlay.east]],
            });
          }

          console.log(`[KMZ] Cached ${layers.length} tiles for ${baseName}`);
          const result = { layers };
          fs.writeFileSync(cacheJsonPath, JSON.stringify(result));

          res.setHeader('Content-Type', 'application/json');
          res.setHeader('Cache-Control', 'public, max-age=86400');
          res.end(JSON.stringify(result));
          console.log(`[KMZ] Done ✓`);

        } catch (err) {
          console.error('[KMZ] Error:', err);
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: err instanceof Error ? err.message : 'Unknown error' }));
        }
      });
    },
  };
}

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react(), tailwindcss(), kmzProcessorPlugin()],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
