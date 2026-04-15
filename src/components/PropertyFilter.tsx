import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, SlidersHorizontal, X, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { allDistricts, allWards, propertyTypeLabel, type PropertyType, type PropertyStatus } from '@/data/properties';

export interface FilterState {
  district: string;
  ward: string;
  minPrice: string;
  maxPrice: string;
  type: PropertyType | '';
  status: PropertyStatus | '';
}

const emptyFilter: FilterState = {
  district: '', ward: '', minPrice: '', maxPrice: '', type: '', status: '',
};

interface PropertyFilterProps {
  onFilterChange: (f: FilterState) => void;
}

function Select({
  value, onChange, disabled, placeholder, options, className
}: {
  value: string;
  onChange: (v: string) => void;
  disabled?: boolean;
  placeholder: string;
  options: { value: string; label: string }[];
  className?: string;
}) {
  return (
    <div className={cn('relative', disabled && 'opacity-40 pointer-events-none', className)}>
      <div className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 flex items-center justify-between gap-1 text-xs text-gray-700">
        <span className="truncate">{value ? options.find(o => o.value === value)?.label ?? value : placeholder}</span>
        <ChevronDown className="w-3.5 h-3.5 text-gray-400 shrink-0" />
      </div>
      <select
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        value={value}
        onChange={e => onChange(e.target.value)}
        disabled={disabled}
      >
        <option value="">{placeholder}</option>
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  );
}

export default function PropertyFilter({ onFilterChange }: PropertyFilterProps) {
  const [filter, setFilter] = useState<FilterState>(emptyFilter);
  const [expanded, setExpanded] = useState(false);
  const [applied, setApplied] = useState<FilterState>(emptyFilter);

  const wardOptions = useMemo(
    () => allWards(filter.district).map(w => ({ value: w, label: w })),
    [filter.district]
  );

  const set = (key: keyof FilterState, val: string) => {
    setFilter(prev => {
      const next = { ...prev, [key]: val };
      if (key === 'district') next.ward = '';
      return next;
    });
  };

  const apply = () => {
    setApplied(filter);
    onFilterChange(filter);
    setExpanded(false);
  };

  const reset = () => {
    setFilter(emptyFilter);
    setApplied(emptyFilter);
    onFilterChange(emptyFilter);
  };

  const hasActive = Object.values(applied).some(v => v !== '');

  return (
    <div className="absolute top-[132px] left-0 right-0 z-10 px-4 pointer-events-auto">
      {/* Compact toggle bar */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setExpanded(v => !v)}
          className={cn(
            'flex items-center gap-2 px-4 py-2.5 rounded-2xl text-sm font-medium shadow-md transition-all border',
            hasActive
              ? 'bg-[#a855f7] border-[#a855f7] text-white'
              : 'bg-white border-gray-200 text-gray-700'
          )}
        >
          <SlidersHorizontal className="w-4 h-4" />
          Lọc BĐS
          {hasActive && (
            <span className="bg-white/20 text-white text-xs rounded-full px-1.5 py-0.5 leading-none">✓</span>
          )}
        </button>

        {hasActive && (
          <button
            onClick={reset}
            className="flex items-center gap-1 px-3 py-2.5 rounded-2xl text-xs text-gray-500 bg-white border border-gray-200 shadow-md"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Xoá
          </button>
        )}

        {/* Active filter pills */}
        {applied.district && (
          <div className="flex items-center gap-1 px-3 py-2.5 rounded-2xl text-xs text-gray-700 bg-white border border-gray-200 shadow-sm max-w-[140px]">
            <span className="truncate">{applied.district.replace('Quận ', 'Q').replace('Huyện ', 'H.')}</span>
          </div>
        )}
        {(applied.minPrice && applied.minPrice !== '0') || (applied.maxPrice && applied.maxPrice !== '500') ? (
          <div className="flex items-center gap-1 px-3 py-2.5 rounded-2xl text-xs text-gray-700 bg-white border border-gray-200 shadow-sm">
            <span>{applied.minPrice || '0'}–{applied.maxPrice || '500'} tỷ</span>
          </div>
        ) : null}
      </div>

      {/* Expanded filter panel */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.97 }}
            transition={{ duration: 0.18 }}
            className="mt-2 bg-white border border-gray-200 rounded-3xl p-4 shadow-xl"
          >
            {/* Close */}
            <div className="flex items-center justify-between mb-3">
              <p className="text-gray-800 font-semibold text-sm">Bộ lọc BĐS</p>
              <button onClick={() => setExpanded(false)}>
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* Location row */}
            <div className="grid grid-cols-2 gap-2 mb-2">
              <Select
                value={filter.district}
                onChange={v => set('district', v)}
                placeholder="Quận / Huyện"
                options={allDistricts.map(d => ({ value: d, label: d }))}
              />
              <Select
                value={filter.ward}
                onChange={v => set('ward', v)}
                disabled={!filter.district}
                placeholder="Phường / Xã"
                options={wardOptions}
              />
            </div>

            {/* Price range slider */}
            <div className="mb-2">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-500">Khoảng giá</span>
                <span className="text-xs font-semibold text-[#a855f7]">
                  {filter.minPrice || '0'} – {filter.maxPrice || '500'} tỷ
                </span>
              </div>
              <div className="relative h-5 flex items-center">
                {/* track background */}
                <div className="absolute inset-x-0 h-1 rounded-full bg-gray-200" />
                {/* active track */}
                <div
                  className="absolute h-1 rounded-full bg-gradient-to-r from-[#6366f1] to-[#a855f7]"
                  style={{
                    left: `${((parseFloat(filter.minPrice || '0') / 500) * 100)}%`,
                    right: `${100 - (parseFloat(filter.maxPrice || '500') / 500) * 100}%`,
                  }}
                />
                {/* Min thumb */}
                <input
                  type="range" min={0} max={500} step={0.5}
                  value={filter.minPrice || '0'}
                  onChange={e => {
                    const v = parseFloat(e.target.value);
                    const max = parseFloat(filter.maxPrice || '500');
                    set('minPrice', String(Math.min(v, max - 0.5)));
                  }}
                  className="absolute inset-0 w-full appearance-none bg-transparent cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#a855f7] [&::-webkit-slider-runnable-track]:appearance-none [&::-webkit-slider-runnable-track]:h-0"
                  style={{ zIndex: (parseFloat(filter.minPrice||'0') >= 490) ? 5 : 3 }}
                />
                {/* Max thumb */}
                <input
                  type="range" min={0} max={500} step={0.5}
                  value={filter.maxPrice || '500'}
                  onChange={e => {
                    const v = parseFloat(e.target.value);
                    const min = parseFloat(filter.minPrice || '0');
                    set('maxPrice', String(Math.max(v, min + 0.5)));
                  }}
                  className="absolute inset-0 w-full appearance-none bg-transparent cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#6366f1] [&::-webkit-slider-runnable-track]:appearance-none [&::-webkit-slider-runnable-track]:h-0"
                  style={{ zIndex: 4 }}
                />
              </div>
              <div className="flex justify-between mt-1 text-[10px] text-gray-400">
                <span>0 tỷ</span>
                <span>500 tỷ</span>
              </div>
            </div>

            {/* Type & status */}
            <div className="grid grid-cols-2 gap-2 mb-3">
              <Select
                value={filter.type}
                onChange={v => set('type', v)}
                placeholder="Loại BĐS"
                options={Object.entries(propertyTypeLabel).map(([k, v]) => ({ value: k, label: v }))}
              />
              <Select
                value={filter.status}
                onChange={v => set('status', v)}
                placeholder="Trạng thái"
                options={[
                  { value: 'cho_ban', label: 'Bán' },
                  { value: 'cho_thue', label: 'Cho thuê' },
                ]}
              />
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button
                onClick={reset}
                className="flex-1 py-2.5 rounded-xl text-sm text-gray-500 bg-gray-100 border border-gray-200"
              >
                Xoá bộ lọc
              </button>
              <button
                onClick={apply}
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-br from-[#6366f1] to-[#a855f7]"
              >
                Áp dụng
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
