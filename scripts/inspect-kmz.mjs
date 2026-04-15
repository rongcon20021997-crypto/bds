import fs from 'fs';
import path from 'path';
import JSZip from 'jszip';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const KMZ_DIR = path.resolve(__dirname, '../public/uploads/kmz');

const filename = process.argv[2] || 'binh-thanh.kmz';
const kmzPath = path.join(KMZ_DIR, filename);

console.log(`\nInspecting: ${filename} (${(fs.statSync(kmzPath).size / 1024 / 1024).toFixed(1)} MB)\n`);

const data = fs.readFileSync(kmzPath);
const zip = await JSZip.loadAsync(data);

// List all files in zip
const files = Object.values(zip.files).filter(f => !f.dir);
console.log(`ZIP contents (${files.length} files):`);
files.forEach(f => console.log(`  ${f.name}`));

// Read KML
const kmlFile = files.find(f => f.name.toLowerCase().endsWith('.kml'));
if (!kmlFile) { console.log('No KML found!'); process.exit(1); }

const kmlText = await kmlFile.async('text');
console.log(`\nKML size: ${(kmlText.length / 1024).toFixed(1)} KB`);

// Count GroundOverlays
const groundOverlayMatches = [...kmlText.matchAll(/<GroundOverlay[\s\S]*?<\/GroundOverlay>/gi)];
console.log(`\nNumber of GroundOverlays: ${groundOverlayMatches.length}`);

// Print first 3 overlays info
groundOverlayMatches.slice(0, 5).forEach((match, i) => {
  const block = match[0];
  const north = block.match(/<north>([\d.\-]+)<\/north>/i)?.[1];
  const south = block.match(/<south>([\d.\-]+)<\/south>/i)?.[1];
  const east  = block.match(/<east>([\d.\-]+)<\/east>/i)?.[1];
  const west  = block.match(/<west>([\d.\-]+)<\/west>/i)?.[1];
  const href  = block.match(/<href>([\s\S]*?)<\/href>/i)?.[1]?.trim();
  console.log(`  [${i}] href=${href} bounds=N${north} S${south} E${east} W${west}`);
});

if (groundOverlayMatches.length > 5) {
  console.log(`  ... and ${groundOverlayMatches.length - 5} more`);
}
