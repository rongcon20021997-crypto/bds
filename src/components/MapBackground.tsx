import { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, ImageOverlay, useMap } from 'react-leaflet';
import L from 'leaflet';
import PropertyMarkers from './PropertyMarkers';
import type { Property } from '@/data/properties';

const customIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

type TileLayer_ = { imageUrl: string; bounds: [[number, number], [number, number]] };
type LayerMap = Record<string, TileLayer_[]>;

function FitBounds({ layers }: { layers: TileLayer_[] }) {
  const map = useMap();
  const prevKeyRef = useRef<string>('');
  useEffect(() => {
    if (layers.length === 0) return;
    const key = layers.map(l => l.imageUrl).join('|');
    if (key === prevKeyRef.current) return;
    prevKeyRef.current = key;
    let south = Infinity, west = Infinity, north = -Infinity, east = -Infinity;
    for (const { bounds } of layers) {
      south = Math.min(south, bounds[0][0]);
      west  = Math.min(west,  bounds[0][1]);
      north = Math.max(north, bounds[1][0]);
      east  = Math.max(east,  bounds[1][1]);
    }
    map.fitBounds([[south, west], [north, east]], { padding: [20, 20] });
  }, [layers, map]);
  return null;
}

interface MapBackgroundProps {
  kmzUrls: string[];
  properties?: Property[];
  selectedPropertyId?: number | null;
  onSelectProperty?: (p: Property) => void;
}

export default function MapBackground({
  kmzUrls,
  properties = [],
  selectedPropertyId,
  onSelectProperty,
}: MapBackgroundProps) {
  const [layerMap, setLayerMap] = useState<LayerMap>({});
  const [loadingSet, setLoadingSet] = useState<Set<string>>(new Set());
  const fetchedRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    const urlSet = new Set(kmzUrls);

    setLayerMap(prev => {
      const next: LayerMap = {};
      for (const url of kmzUrls) {
        if (prev[url] !== undefined) next[url] = prev[url];
      }
      return next;
    });

    for (const url of fetchedRef.current) {
      if (!urlSet.has(url)) fetchedRef.current.delete(url);
    }

    const controllers: AbortController[] = [];
    for (const url of kmzUrls) {
      if (fetchedRef.current.has(url)) continue;
      fetchedRef.current.add(url);

      const ctrl = new AbortController();
      controllers.push(ctrl);

      const filename = url.split('/').pop() ?? '';
      const baseName = filename.replace(/\.kmz$/i, '');
      setLoadingSet(prev => new Set(prev).add(url));

      // Try static cache first (works on Vercel), then fall back to dev API
      const cacheUrl = `/uploads/kmz-cache/${baseName}.json`;

      fetch(cacheUrl, { signal: ctrl.signal })
        .then(async res => {
          if (res.ok) {
            console.log(`[KMZ] Loaded from static cache: ${baseName}`);
            return res.json() as Promise<{ layers: TileLayer_[] }>;
          }
          // Cache miss → fall back to dev server API
          console.log(`[KMZ] Cache miss, trying API: ${filename}`);
          const apiRes = await fetch(`/api/kmz/${filename}`, { signal: ctrl.signal });
          if (!apiRes.ok) {
            const err = await apiRes.json().catch(() => ({ error: apiRes.statusText }));
            throw new Error(err.error ?? apiRes.statusText);
          }
          return apiRes.json() as Promise<{ layers: TileLayer_[] }>;
        })
        .then(data => {
          setLayerMap(prev => ({ ...prev, [url]: data.layers }));
        })
        .catch(err => {
          if (err instanceof Error && err.name === 'AbortError') {
            fetchedRef.current.delete(url);
            return;
          }
          console.error('[KMZ] Failed:', url, err);
          setLayerMap(prev => ({ ...prev, [url]: [] }));
        })
        .finally(() => {
          setLoadingSet(prev => {
            const next = new Set(prev);
            next.delete(url);
            return next;
          });
        });
    }

    return () => controllers.forEach(c => c.abort());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [kmzUrls.join(',')]);

  const allTiles = kmzUrls.flatMap(url => layerMap[url] ?? []);

  return (
    <div className="absolute inset-0 z-0 bg-[#e5e3df]">
      <MapContainer
        center={[10.7769, 106.7009]}
        zoom={12}
        zoomControl={false}
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; Google Maps'
          url="https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}"
        />

        <Marker position={[10.7769, 106.7009]} icon={customIcon}>
          <Popup>Quận 1, TP Hồ Chí Minh</Popup>
        </Marker>

        {/* Planning overlay tiles */}
        {allTiles.map(tile => (
          <ImageOverlay
            key={tile.imageUrl}
            url={tile.imageUrl}
            bounds={tile.bounds}
            opacity={0.75}
          />
        ))}

        {allTiles.length > 0 && <FitBounds layers={allTiles} />}

        {/* Property price markers */}
        {properties.length > 0 && onSelectProperty && (
          <PropertyMarkers
            properties={properties}
            onSelect={onSelectProperty}
            selectedId={selectedPropertyId}
          />
        )}
      </MapContainer>

      {/* Loading spinner */}
      {loadingSet.size > 0 && (
        <div className="absolute bottom-36 left-1/2 -translate-x-1/2 z-[1000] pointer-events-none">
          <div className="bg-black/80 text-white px-5 py-2.5 rounded-full flex items-center gap-3 backdrop-blur-md shadow-xl">
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            <span className="text-sm font-medium whitespace-nowrap">
              Đang tải {loadingSet.size} lớp bản đồ…
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
