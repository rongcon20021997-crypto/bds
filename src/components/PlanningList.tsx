import { motion, AnimatePresence } from 'motion/react';
import { ChevronUp, MapPin, CheckCircle2, Ban, Layers } from 'lucide-react';
import { cn } from '@/lib/utils';
import { planningData } from '../App';
import { useState } from 'react';

interface PlanningListProps {
  isExpanded: boolean;
  setIsExpanded: (val: boolean) => void;
  selectedKmzUrls: Set<string>;
  onToggleKmz: (url: string) => void;
}

export default function PlanningList({
  isExpanded,
  setIsExpanded,
  selectedKmzUrls,
  onToggleKmz,
}: PlanningListProps) {
  const [activeTab, setActiveTab] = useState('2025');
  const activeCount = selectedKmzUrls.size;

  return (
    <>
      {/* Floating Toggle Button */}
      <AnimatePresence>
        {!isExpanded && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="absolute bottom-28 left-1/2 -translate-x-1/2 z-10 pointer-events-auto"
          >
            <button
              onClick={() => setIsExpanded(true)}
              className="bg-white border border-gray-200 text-gray-800 px-6 py-3 rounded-2xl shadow-lg font-medium flex items-center gap-2"
            >
              <Layers className="w-4 h-4 text-[#a855f7]" />
              Danh sách quy hoạch
              {activeCount > 0 && (
                <span className="ml-1 bg-[#a855f7] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {activeCount}
                </span>
              )}
              <ChevronUp className="w-5 h-5 text-gray-500" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expanded Bottom Sheet */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="absolute bottom-0 left-0 right-0 z-30 bg-white rounded-t-[40px] border-t border-gray-200 shadow-[0_-10px_40px_rgba(0,0,0,0.12)] h-[85%] flex flex-col pointer-events-auto"
          >
            {/* Drag Handle & Header */}
            <div
              className="pt-3 pb-4 px-4 flex flex-col items-center cursor-pointer border-b border-gray-100"
              onClick={() => setIsExpanded(false)}
            >
              <div className="w-12 h-1.5 bg-gray-200 rounded-full mb-4" />
              <div className="flex items-center gap-2 text-gray-800 font-medium text-lg">
                <MapPin className="w-5 h-5 text-[#a855f7]" />
                Vị trí đang ghim: Quận 1, Hồ Chí Minh
              </div>
              {activeCount > 0 && (
                <p className="text-xs text-[#a855f7] mt-1">
                  {activeCount} lớp bản đồ đang hiển thị
                </p>
              )}
            </div>

            {/* Tabs */}
            <div className="flex p-4 gap-2">
              <button
                onClick={() => setActiveTab('2025')}
                className={cn(
                  'flex-1 py-3 text-center font-medium rounded-xl transition-colors',
                  activeTab === '2025'
                    ? 'bg-gradient-to-br from-[#6366f1] to-[#a855f7] text-white'
                    : 'bg-gray-100 text-gray-500 border border-gray-200'
                )}
              >
                Năm 2025
              </button>
              <button
                onClick={() => setActiveTab('2030')}
                className={cn(
                  'flex-1 py-3 text-center font-medium rounded-xl transition-colors',
                  activeTab === '2030'
                    ? 'bg-gradient-to-br from-[#6366f1] to-[#a855f7] text-white'
                    : 'bg-gray-100 text-gray-500 border border-gray-200'
                )}
              >
                Năm 2030
              </button>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto pb-24 px-4 flex flex-col gap-3">
              {planningData.map((item) => {
                const isActive = selectedKmzUrls.has(item.kmzUrl);
                return (
                  <motion.div
                    key={item.id}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onToggleKmz(item.kmzUrl)}
                    className={cn(
                      'flex gap-4 p-4 rounded-[18px] cursor-pointer transition-all border',
                      isActive
                        ? 'bg-[#a855f7]/5 border-[#a855f7]/40 shadow-sm'
                        : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                    )}
                  >
                    {/* Thumbnail */}
                    <div className="w-20 h-28 shrink-0 rounded-xl overflow-hidden bg-gray-200 relative">
                      <img
                        src={item.image}
                        alt=""
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      {isActive && (
                        <div className="absolute inset-0 bg-[#a855f7]/20 flex items-center justify-center">
                          <div className="w-7 h-7 bg-[#a855f7] rounded-full flex items-center justify-center">
                            <CheckCircle2 className="w-4 h-4 text-white" />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex flex-col justify-center flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-800 leading-tight mb-2 line-clamp-2">
                        {item.title}
                      </h3>
                      <p
                        className={cn(
                          'font-medium mb-1 text-sm',
                          item.price === 'Miễn phí' ? 'text-emerald-600' : 'text-red-500'
                        )}
                      >
                        {item.price}
                      </p>
                      <div
                        className={cn(
                          'flex items-center gap-1 text-xs',
                          item.statusType === 'active'
                            ? 'text-emerald-600'
                            : item.statusType === 'expired'
                            ? 'text-red-500'
                            : 'text-[#a855f7]'
                        )}
                      >
                        {item.statusType === 'active' && <CheckCircle2 className="w-3.5 h-3.5" />}
                        {item.statusType === 'expired' && <Ban className="w-3.5 h-3.5" />}
                        {item.status}
                      </div>
                    </div>

                    {/* Toggle switch */}
                    <div className="flex items-center shrink-0">
                      <div
                        className={cn(
                          'w-12 h-6 rounded-full relative transition-colors duration-300',
                          isActive ? 'bg-[#a855f7]' : 'bg-gray-200'
                        )}
                      >
                        <div
                          className={cn(
                            'absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all duration-300',
                            isActive ? 'left-7' : 'left-1'
                          )}
                        />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
