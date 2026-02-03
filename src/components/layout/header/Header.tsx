import { useState } from 'react';
import { Menu } from 'lucide-react';
import { useNavigate } from 'react-router';
import Button from '../../ui/Button';
import { cn } from '../../../utils/ui.util';

import NavLogo from './NavLogo';
import DesktopNav from './DesktopNav';
import MobileDrawer from './MobileDrawer';
import SearchSection from './SearchSection';

const Header = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Catalog', href: '/anime' },
    { name: 'Favourites', href: '/favourites' },
  ];

  const handleNavigate = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    setIsDrawerOpen(false);
    navigate(href);
  };

  return (
    <>
      <header
        className={cn([
          'fixed top-0 z-50 w-full h-20 border-b text-white border-white/10 flex items-center',
          ' px-4 md:px-6 lg:px-10',
          'bg-zinc-950 lg:bg-transparent',
        ])}>
        <nav className="flex items-center justify-between w-full">
          {/* Left Section */}
          <div
            className={cn(
              'flex items-center transition-all gap-10',
              isSearchExpanded
                ? 'opacity-0 invisible w-0 flex-0 md:opacity-100 md:w-full md:visible md:flex-1'
                : 'opacity-100 visible flex-1',
            )}>
            <div className="flex items-center gap-6 sm:gap-10 ">
              <Button
                className="lg:hidden"
                secondary
                icon={<Menu size={24} />}
                onClick={() => setIsDrawerOpen(true)}
              />
              <NavLogo onClick={(e) => handleNavigate(e, '/')} />
            </div>

            <DesktopNav navItems={navItems} onNavigate={handleNavigate} />
          </div>

          {/* Right Section */}
          <SearchSection
            isExpanded={isSearchExpanded}
            setIsExpanded={setIsSearchExpanded}
          />
        </nav>
      </header>

      <MobileDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        navItems={navItems}
        onNavigate={handleNavigate}
      />
    </>
  );
};

export default Header;
