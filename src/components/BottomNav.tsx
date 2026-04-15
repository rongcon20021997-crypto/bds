import { Home, Map, HeadphonesIcon, User, MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BottomNavProps {
  onOpenPlanning?: () => void;
}

export default function BottomNav({ onOpenPlanning }: BottomNavProps) {
  const tabs = [
    { icon: Home, label: 'Trang chủ', active: true, onClick: undefined },
    { icon: Map, label: 'Quy hoạch', active: false, onClick: onOpenPlanning },
    { icon: HeadphonesIcon, label: 'Hỗ trợ', active: false, onClick: undefined },
    { icon: User, label: 'Tài khoản', active: false, onClick: undefined },
    { icon: MoreHorizontal, label: 'Xem thêm', active: false, onClick: undefined },
  ];

  return (
    <div className="absolute bottom-0 left-0 right-0 z-20 bg-white/95 backdrop-blur-md border-t border-gray-200 px-4 py-3 pb-6 pointer-events-auto shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
      <div className="flex items-center justify-around">
        {tabs.map(({ icon: Icon, label, active, onClick }) => (
          <button
            key={label}
            onClick={onClick}
            className={cn(
              'flex flex-col items-center gap-1 transition-colors',
              active ? 'text-[#a855f7]' : 'text-gray-400 hover:text-gray-600'
            )}
          >
            <div className={cn(
              'w-10 h-10 rounded-xl flex items-center justify-center transition-colors',
              active ? 'bg-[#a855f7]/10' : ''
            )}>
              <Icon className="w-5 h-5" color={active ? '#a855f7' : undefined} />
            </div>
            <span className="text-[10px] font-medium">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
