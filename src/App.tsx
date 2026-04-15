/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useCallback, useMemo } from 'react';
import MapBackground from './components/MapBackground';
import TopOverlay from './components/TopOverlay';
import BottomNav from './components/BottomNav';
import PlanningList from './components/PlanningList';
import SearchModal from './components/SearchModal';
import PropertyFilter, { type FilterState } from './components/PropertyFilter';
import PropertyDetailSheet from './components/PropertyDetailSheet';
import { propertiesData, filterProperties, type Property } from './data/properties';

export const planningData = [
  {
    id: 1,
    title: 'Bản Đồ Quy Hoạch Sử Dụng Đất Quận Bình Thạnh',
    price: 'Miễn phí',
    status: 'Còn hiệu lực',
    statusType: 'active',
    image: 'https://placehold.co/100x150/1c1c1e/a855f7?text=Binh+Thanh',
    kmzUrl: '/uploads/kmz/binh-thanh.kmz',
  },
  {
    id: 2,
    title: 'Bản Đồ Quy Hoạch Sử Dụng Đất Quận 1',
    price: 'Miễn phí',
    status: 'Còn hiệu lực',
    statusType: 'active',
    image: 'https://placehold.co/100x150/1c1c1e/a855f7?text=Quan+1',
    kmzUrl: '/uploads/kmz/quan-1.kmz',
  },
  {
    id: 3,
    title: 'Bản Đồ Quy Hoạch Sử Dụng Đất TP Thủ Đức',
    price: 'Miễn phí',
    status: 'Còn hiệu lực',
    statusType: 'active',
    image: 'https://placehold.co/100x150/1c1c1e/a855f7?text=Thu+Duc',
    kmzUrl: '/uploads/kmz/thu-duc.kmz',
  },
];

const emptyFilter: FilterState = {
  district: '', ward: '', minPrice: '', maxPrice: '', type: '', status: '',
};

export default function App() {
  // Map / KMZ state
  const [isListExpanded, setIsListExpanded] = useState(false);
  const [selectedKmzUrls, setSelectedKmzUrls] = useState<Set<string>>(new Set());

  // Search modal
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Property filter + selection
  const [filter, setFilter] = useState<FilterState>(emptyFilter);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  // Show/hide property markers (tied to whether filter is active)
  const filteredProperties = useMemo(() => {
    return filterProperties(propertiesData, {
      district: filter.district,
      ward: filter.ward,
      minPrice: filter.minPrice ? parseFloat(filter.minPrice) : undefined,
      maxPrice: filter.maxPrice ? parseFloat(filter.maxPrice) : undefined,
      type: filter.type,
      status: filter.status,
    });
  }, [filter]);

  const toggleKmz = useCallback((url: string) => {
    setSelectedKmzUrls(prev => {
      const next = new Set(prev);
      next.has(url) ? next.delete(url) : next.add(url);
      return next;
    });
  }, []);

  const handleSelectProperty = useCallback((p: Property) => {
    setSelectedProperty(prev => (prev?.id === p.id ? null : p));
    // Collapse planning list if open
    setIsListExpanded(false);
  }, []);

  const handleFilterChange = useCallback((f: FilterState) => {
    setFilter(f);
    setSelectedProperty(null);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200 font-sans">
      <div className="relative w-full h-[100dvh] sm:h-[852px] sm:w-[393px] sm:rounded-[40px] sm:border-[8px] border-gray-300 overflow-hidden bg-gray-50 text-gray-900 shadow-2xl">

        {/* Map Layer — always behind everything */}
        <MapBackground
          kmzUrls={[...selectedKmzUrls]}
          properties={filteredProperties}
          selectedPropertyId={selectedProperty?.id}
          onSelectProperty={handleSelectProperty}
        />

        {/* Top search bar */}
        <TopOverlay onSearchClick={() => setIsSearchOpen(true)} />

        {/* Property filter strip (floats below search bar) */}
        <PropertyFilter onFilterChange={handleFilterChange} />

        {/* Result count badge */}
        {Object.values(filter).some(v => v !== '') && (
          <div className="absolute z-10 pointer-events-none"
            style={{ top: 188, left: 0, right: 0, display: 'flex', justifyContent: 'center' }}
          >
            <div className="bg-white/90 backdrop-blur-md border border-gray-200 rounded-full px-4 py-1.5 text-xs text-gray-600 shadow-md">
              {filteredProperties.length === 0
                ? 'Không tìm thấy BĐS nào'
                : `${filteredProperties.length} bất động sản phù hợp`}
            </div>
          </div>
        )}

        {/* Planning layers bottom sheet */}
        <PlanningList
          isExpanded={isListExpanded}
          setIsExpanded={setIsListExpanded}
          selectedKmzUrls={selectedKmzUrls}
          onToggleKmz={toggleKmz}
        />

        {/* Property detail card (shows when a marker is tapped) */}
        <PropertyDetailSheet
          property={selectedProperty}
          onClose={() => setSelectedProperty(null)}
        />

        {/* Bottom navigation */}
        <BottomNav onOpenPlanning={() => { setIsListExpanded(true); setSelectedProperty(null); }} />

        {/* Search modal */}
        <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      </div>
    </div>
  );
}
