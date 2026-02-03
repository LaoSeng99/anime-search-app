import { X } from 'lucide-react';
import { cn } from '../../../utils/ui.util';
import NavLogo from './NavLogo';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: Array<{ name: string; href: string }>;
  onNavigate: (e: React.MouseEvent, href: string) => void;
}

const MobileDrawer = ({
  isOpen,
  onClose,
  navItems,
  onNavigate,
}: MobileDrawerProps) => {
  return (
    <div
      className={cn(
        'fixed inset-0 z-60 bg-black/60 backdrop-blur-sm lg:hidden transition-opacity duration-300',
        isOpen
          ? 'opacity-100 pointer-events-auto'
          : 'opacity-0 pointer-events-none',
      )}
      onClick={onClose}>
      <aside
        className={cn(
          'w-72 h-full bg-zinc-950 border-r border-white/10 p-6 transition-transform duration-300 ease-out',
          isOpen ? 'translate-x-0' : '-translate-x-full',
        )}
        onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-10">
          <NavLogo onClick={(e) => onNavigate(e, '/')} />
          <button onClick={onClose} className="p-2 text-gray-400">
            <X size={24} />
          </button>
        </div>
        <ul className="space-y-6">
          {navItems.map((item) => (
            <li key={item.name}>
              <a
                onClick={(e) => onNavigate(e, item.href)}
                className="text-xl font-medium text-gray-200 hover:text-white block">
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
};

export default MobileDrawer;
