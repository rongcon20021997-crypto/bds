import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronRight, ChevronDown, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const locationData = [
  {
    id: '79', name: 'TP Hồ Chí Minh',
    districts: [
      { id: '760', name: 'Quận 1', wards: [{ id: '1', name: 'Phường Bến Nghé' }, { id: '2', name: 'Phường Bến Thành' }, { id: '3', name: 'Phường Đa Kao' }] },
      { id: '769', name: 'TP Thủ Đức', wards: [{ id: '4', name: 'Phường Thảo Điền' }, { id: '5', name: 'Phường An Phú' }, { id: '6', name: 'Phường Linh Trung' }] },
      { id: '761', name: 'Quận 12', wards: [{ id: '7', name: 'Phường Thạnh Xuân' }, { id: '8', name: 'Phường Thạnh Lộc' }] }
    ]
  },
  {
    id: '01', name: 'Hà Nội',
    districts: [
      { id: '001', name: 'Quận Ba Đình', wards: [{ id: '9', name: 'Phường Phúc Xá' }, { id: '10', name: 'Phường Trúc Bạch' }] },
      { id: '002', name: 'Quận Hoàn Kiếm', wards: [{ id: '11', name: 'Phường Đồng Xuân' }, { id: '12', name: 'Phường Hàng Bạc' }] }
    ]
  },
  {
    id: '48', name: 'Đà Nẵng',
    districts: [
      { id: '490', name: 'Quận Liên Chiểu', wards: [{ id: '13', name: 'Phường Hòa Hiệp Bắc' }, { id: '14', name: 'Phường Hòa Hiệp Nam' }] },
      { id: '492', name: 'Quận Hải Châu', wards: [{ id: '15', name: 'Phường Hải Châu I' }, { id: '16', name: 'Phường Hải Châu II' }] }
    ]
  }
];

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [activeTab, setActiveTab] = useState('before');
  
  const [provId, setProvId] = useState<string>('');
  const [distId, setDistId] = useState<string>('');
  const [wardId, setWardId] = useState<string>('');

  const selectedProv = locationData.find(p => p.id === provId);
  const selectedDist = selectedProv?.districts.find(d => d.id === distId);
  const selectedWard = selectedDist?.wards.find(w => w.id === wardId);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="absolute inset-0 z-50 bg-gray-50 flex flex-col text-gray-800"
        >
          {/* Header */}
          <div className="bg-white border-b border-gray-200 flex items-center justify-between px-4 py-4 pt-12 shadow-sm">
            <div className="w-8" />
            <h1 className="text-lg font-semibold text-gray-900">Tìm kiếm bản đồ</h1>
            <button onClick={onClose} className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-700">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex p-4 gap-2 bg-white border-b border-gray-100">
            <button
              onClick={() => setActiveTab('before')}
              className={cn(
                "flex-1 py-3 text-center font-medium rounded-xl transition-colors",
                activeTab === 'before'
                  ? "bg-gradient-to-br from-[#6366f1] to-[#a855f7] text-white"
                  : "bg-gray-100 text-gray-500 border border-gray-200"
              )}
            >
              Trước sáp nhập
            </button>
            <button
              onClick={() => setActiveTab('after')}
              className={cn(
                "flex-1 py-3 text-center font-medium rounded-xl transition-colors",
                activeTab === 'after'
                  ? "bg-gradient-to-br from-[#6366f1] to-[#a855f7] text-white"
                  : "bg-gray-100 text-gray-500 border border-gray-200"
              )}
            >
              Sau sáp nhập
            </button>
          </div>

          {/* Search Form */}
          <div className="p-4 border-b border-gray-200 bg-white">
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                placeholder="Nhập từ khoá có dấu"
                className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-[#a855f7]"
              />
              <button className="bg-gradient-to-br from-[#6366f1] to-[#a855f7] text-white px-6 rounded-xl font-medium">
                Tìm
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2 mb-2">
              <div className="relative">
                <div className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-3 flex items-center justify-between text-xs text-gray-600">
                  <span className="truncate">{selectedProv ? selectedProv.name : 'Tỉnh/Thành'}</span>
                  <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />
                </div>
                <select
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  value={provId}
                  onChange={(e) => { setProvId(e.target.value); setDistId(''); setWardId(''); }}
                >
                  <option value="">Tỉnh/Thành</option>
                  {locationData.map(p => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
              </div>

              <div className={cn("relative", !provId && "opacity-50")}>
                <div className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-3 flex items-center justify-between text-xs text-gray-600">
                  <span className="truncate">{selectedDist ? selectedDist.name : 'Quận/Huyện'}</span>
                  <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />
                </div>
                <select
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                  value={distId}
                  disabled={!provId}
                  onChange={(e) => { setDistId(e.target.value); setWardId(''); }}
                >
                  <option value="">Quận/Huyện</option>
                  {selectedProv?.districts.map(d => (
                    <option key={d.id} value={d.id}>{d.name}</option>
                  ))}
                </select>
              </div>

              <div className={cn("relative", !distId && "opacity-50")}>
                <div className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-3 flex items-center justify-between text-xs text-gray-600">
                  <span className="truncate">{selectedWard ? selectedWard.name : 'Phường/Xã'}</span>
                  <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />
                </div>
                <select
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                  value={wardId}
                  disabled={!distId}
                  onChange={(e) => setWardId(e.target.value)}
                >
                  <option value="">Phường/Xã</option>
                  {selectedDist?.wards.map(w => (
                    <option key={w.id} value={w.id}>{w.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-3 flex items-center justify-between text-sm text-gray-600">
                <span className="truncate">Chọn loại quy hoạch</span>
                <ChevronRight className="w-4 h-4 text-gray-400 shrink-0" />
              </button>
              <button className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-3 flex items-center justify-between text-sm text-gray-600">
                <span className="truncate">Chọn năm</span>
                <ChevronRight className="w-4 h-4 text-gray-400 shrink-0" />
              </button>
            </div>
          </div>

          {/* Empty State */}
          <div className="flex-1 flex flex-col items-center justify-center gap-4 text-gray-400 px-8">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
              <Search className="w-8 h-8 text-gray-300" />
            </div>
            <div className="text-center">
              <p className="font-medium text-gray-500 mb-1">Chưa có kết quả</p>
              <p className="text-sm text-gray-400">Nhập từ khoá hoặc chọn khu vực để tìm bản đồ quy hoạch</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
