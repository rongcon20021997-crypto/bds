import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, MapPin, Phone, Share2, Bookmark,
  Home, Building2, TreePine, Hotel, Compass, Layers,
  BedDouble, Bath, Ruler, ArrowLeftRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Property } from '@/data/properties';
import { formatPrice, propertyTypeLabel } from '@/data/properties';

const TYPE_COLOR: Record<string, string> = {
  dat_nen:  'text-[#f59e0b]',
  nha_pho:  'text-[#a855f7]',
  biet_thu: 'text-[#ec4899]',
  can_ho:   'text-[#06b6d4]',
};
const TYPE_BG: Record<string, string> = {
  dat_nen:  'bg-[#f59e0b]/10 border-[#f59e0b]/20',
  nha_pho:  'bg-[#a855f7]/10 border-[#a855f7]/20',
  biet_thu: 'bg-[#ec4899]/10 border-[#ec4899]/20',
  can_ho:   'bg-[#06b6d4]/10 border-[#06b6d4]/20',
};
const TYPE_ICON: Record<string, React.ElementType> = {
  dat_nen:  TreePine,
  nha_pho:  Home,
  biet_thu: Hotel,
  can_ho:   Building2,
};

interface PropertyDetailSheetProps {
  property: Property | null;
  onClose: () => void;
}

export default function PropertyDetailSheet({ property, onClose }: PropertyDetailSheetProps) {
  if (!property) return null;
  const TypeIcon = TYPE_ICON[property.type] ?? Home;

  return (
    <AnimatePresence>
      {property && (
        <motion.div
          key={property.id}
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 28, stiffness: 220 }}
          className="absolute bottom-0 left-0 right-0 z-40 pointer-events-auto"
          style={{ maxHeight: '72%' }}
        >
          <div className="bg-white rounded-t-[32px] border-t border-gray-200 shadow-[0_-10px_40px_rgba(0,0,0,0.15)] flex flex-col overflow-hidden h-full">
            {/* Drag handle */}
            <div className="pt-3 pb-2 flex justify-center shrink-0">
              <div className="w-10 h-1 bg-gray-300 rounded-full" />
            </div>

            {/* Scrollable content */}
            <div className="overflow-y-auto pb-4 flex-1">
              {/* Header card */}
              <div className="px-4 mb-3">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className={cn('flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-medium', TYPE_BG[property.type], TYPE_COLOR[property.type])}>
                    <TypeIcon className="w-3 h-3" />
                    {propertyTypeLabel[property.type]}
                  </div>
                  <div className="flex items-center gap-1">
                    <span className={cn('text-xs px-2 py-1 rounded-lg font-medium',
                      property.status === 'cho_ban' ? 'bg-emerald-50 text-emerald-600' : 'bg-cyan-50 text-cyan-600'
                    )}>
                      {property.status === 'cho_ban' ? 'Đang bán' : 'Cho thuê'}
                    </span>
                    <button onClick={onClose} className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center">
                      <X className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                </div>

                <h2 className="text-gray-900 font-bold text-base leading-tight mb-1">{property.title}</h2>
                <div className="flex items-center gap-1 text-gray-400 text-xs mb-3">
                  <MapPin className="w-3 h-3" />
                  <span>{property.address}, {property.ward}, {property.district}</span>
                </div>

                {/* Price */}
                <div className="bg-gray-50 border border-gray-100 rounded-2xl p-3 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] text-gray-400 mb-0.5">
                      {property.status === 'cho_ban' ? 'Giá bán' : 'Giá thuê/tháng'}
                    </p>
                    <p className="text-[#a855f7] text-xl font-bold">{formatPrice(property.price)}</p>
                    {property.pricePerM2 > 0 && (
                      <p className="text-gray-400 text-xs">{property.pricePerM2.toLocaleString()} triệu/m²</p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-gray-400 mb-0.5">Diện tích</p>
                    <p className="text-gray-900 text-lg font-bold">{property.area} m²</p>
                    {property.frontWidth > 0 && (
                      <p className="text-gray-400 text-xs">{property.frontWidth} × {property.depth} m</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Specs grid */}
              <div className="px-4 grid grid-cols-3 gap-2 mb-3">
                {property.direction && (
                  <div className="bg-gray-50 border border-gray-100 rounded-xl p-2.5 flex flex-col items-center gap-1">
                    <Compass className="w-4 h-4 text-gray-400" />
                    <p className="text-[10px] text-gray-400">Hướng</p>
                    <p className="text-gray-700 text-xs font-medium text-center">{property.direction}</p>
                  </div>
                )}
                {property.bedrooms > 0 && (
                  <div className="bg-gray-50 border border-gray-100 rounded-xl p-2.5 flex flex-col items-center gap-1">
                    <BedDouble className="w-4 h-4 text-gray-400" />
                    <p className="text-[10px] text-gray-400">Phòng ngủ</p>
                    <p className="text-gray-700 text-xs font-medium">{property.bedrooms}</p>
                  </div>
                )}
                {property.bathrooms > 0 && (
                  <div className="bg-gray-50 border border-gray-100 rounded-xl p-2.5 flex flex-col items-center gap-1">
                    <Bath className="w-4 h-4 text-gray-400" />
                    <p className="text-[10px] text-gray-400">WC</p>
                    <p className="text-gray-700 text-xs font-medium">{property.bathrooms}</p>
                  </div>
                )}
                {property.floors > 0 && (
                  <div className="bg-gray-50 border border-gray-100 rounded-xl p-2.5 flex flex-col items-center gap-1">
                    <Layers className="w-4 h-4 text-gray-400" />
                    <p className="text-[10px] text-gray-400">Số tầng</p>
                    <p className="text-gray-700 text-xs font-medium">{property.floors}</p>
                  </div>
                )}
                <div className="bg-gray-50 border border-gray-100 rounded-xl p-2.5 flex flex-col items-center gap-1">
                  <Ruler className="w-4 h-4 text-gray-400" />
                  <p className="text-[10px] text-gray-400">Số tờ</p>
                  <p className="text-gray-700 text-xs font-medium">{property.soTo}</p>
                </div>
                <div className="bg-gray-50 border border-gray-100 rounded-xl p-2.5 flex flex-col items-center gap-1">
                  <ArrowLeftRight className="w-4 h-4 text-gray-400" />
                  <p className="text-[10px] text-gray-400">Số thửa</p>
                  <p className="text-gray-700 text-xs font-medium">{property.soThua}</p>
                </div>
              </div>

              {/* Planning info */}
              <div className="px-4 mb-3">
                <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-3">
                  <p className="text-[10px] text-indigo-500 font-medium mb-1">📋 Quy hoạch đất</p>
                  <p className="text-gray-700 text-xs">{property.planning}</p>
                </div>
              </div>

              {/* Description */}
              <div className="px-4 mb-4">
                <p className="text-[10px] text-gray-400 font-medium mb-1 uppercase tracking-wider">Mô tả</p>
                <p className="text-gray-600 text-xs leading-relaxed">{property.description}</p>
              </div>

              {/* Action buttons */}
              <div className="px-4 flex gap-2">
                <a
                  href={`tel:${property.contact.replace(/\s/g, '')}`}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl bg-gradient-to-br from-[#6366f1] to-[#a855f7] text-white text-sm font-semibold"
                >
                  <Phone className="w-4 h-4" />
                  {property.contact}
                </a>
                <button className="w-12 h-12 rounded-2xl bg-gray-100 border border-gray-200 flex items-center justify-center">
                  <Bookmark className="w-5 h-5 text-gray-500" />
                </button>
                <button className="w-12 h-12 rounded-2xl bg-gray-100 border border-gray-200 flex items-center justify-center">
                  <Share2 className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
