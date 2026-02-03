import { Keyboard } from 'lucide-react';
import KeyboardShortcutContent from '../../KeyboardShortcutContent';
import { useDialog } from '../../../hooks/useDialog';

interface DesktopNavProps {
  navItems: Array<{ name: string; href: string }>;
  onNavigate: (e: React.MouseEvent, href: string) => void;
}

const DesktopNav = ({ navItems, onNavigate }: DesktopNavProps) => {
  const { custom } = useDialog();

  return (
    <ul className="hidden lg:flex items-center gap-6">
      {navItems.map((item) => (
        <li key={item.name}>
          <a
            onClick={(e) => onNavigate(e, item.href)}
            href={item.href}
            className="px-3 py-2 text-md font-semibold transition-all duration-200 text-gray-200 hover:text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
            {item.name}
          </a>
        </li>
      ))}
      <li className="flex items-center gap-4 ml-4 py-1 px-3 border-l border-white/30 text-xs font-medium text-gray-300">
        <div
          className="flex items-center gap-2 group cursor-help"
          onClick={() =>
            custom('Keyboard shortcut', <KeyboardShortcutContent />)
          }>
          <div className="flex items-center justify-center w-8 h-8 bg-white/10 border border-white/20 rounded shadow-inner">
            <Keyboard size={24} className="text-white" />
          </div>
          <span className="font-semibold transition-all duration-200 text-[12px] text-gray-200 hover:text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] uppercase tracking-wider">
            Keyboard Shortcut
          </span>
        </div>
      </li>
    </ul>
  );
};

export default DesktopNav;
