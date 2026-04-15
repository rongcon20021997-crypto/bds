import { useMap } from 'react-leaflet';
import { useEffect, useRef } from 'react';
import L from 'leaflet';
import type { Property } from '@/data/properties';
import { formatPrice, propertyTypeLabel } from '@/data/properties';

interface PropertyMarkersProps {
  properties: Property[];
  onSelect: (p: Property) => void;
  selectedId?: number | null;
}

const TYPE_COLOR: Record<string, string> = {
  dat_nen:  '#f59e0b',
  nha_pho:  '#a855f7',
  biet_thu: '#ec4899',
  can_ho:   '#06b6d4',
};

export default function PropertyMarkers({ properties, onSelect, selectedId }: PropertyMarkersProps) {
  const map = useMap();
  const markersRef = useRef<L.Marker[]>([]);

  useEffect(() => {
    // Remove old markers
    markersRef.current.forEach(m => m.remove());
    markersRef.current = [];

    properties.forEach(prop => {
      const color = TYPE_COLOR[prop.type] ?? '#a855f7';
      const isSelected = prop.id === selectedId;
      const priceLabel = formatPrice(prop.price);

      const html = `<div style="display:inline-block;transform:translate(-50%,-100%);cursor:pointer;">
  <div style="
    background:${isSelected ? '#fff' : color};
    color:${isSelected ? color : '#fff'};
    border:2px solid ${color};
    border-radius:20px;
    padding:3px 10px;
    font-size:11px;
    font-weight:700;
    white-space:nowrap;
    box-shadow:0 4px 16px rgba(0,0,0,0.45);
    font-family:system-ui,-apple-system,sans-serif;
    transform:${isSelected ? 'scale(1.15)' : 'scale(1)'};
    transition:transform 0.2s;
    line-height:1.6;
  ">${priceLabel}</div>
  <div style="width:8px;height:8px;background:${color};border:2px solid white;border-radius:50%;margin:2px auto 0;box-shadow:0 2px 6px rgba(0,0,0,0.4);"></div>
</div>`;

      const icon = L.divIcon({
        className: '',
        iconSize: [0, 0],
        iconAnchor: [0, 0],
        html,
      });

      const marker = L.marker([prop.lat, prop.lng], { icon, zIndexOffset: isSelected ? 1000 : 0 });
      marker.on('click', () => onSelect(prop));
      marker.addTo(map);
      markersRef.current.push(marker);
    });

    return () => {
      markersRef.current.forEach(m => m.remove());
      markersRef.current = [];
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [properties, selectedId, map]);

  return null;
}
