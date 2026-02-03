import { cn } from '../../../utils/ui.util';

interface NavLogoProps {
  onClick: (e: React.MouseEvent) => void;
  className?: string;
}

const NavLogo = ({ onClick, className }: NavLogoProps) => (
  <a
    onClick={onClick}
    className={cn(
      'text-xl sm:text-3xl font-extrabold tracking-tighter cursor-pointer font-heading drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] text-white antialiased transition-opacity',
      className,
    )}>
    AnimeSearch
  </a>
);

export default NavLogo;
