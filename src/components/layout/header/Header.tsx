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
      <header className="fixed top-0 z-50 w-full h-20 backdrop-blur-md border-b text-white border-white/10 flex items-center px-10">
        <nav className="flex items-center justify-between w-full">
          {/* Left Section */}
          <div
            className={cn(
              'flex items-center gap-10 transition-all',
              isSearchExpanded
                ? 'opacity-0 invisible w-0'
                : 'opacity-100 visible',
            )}>
            <div className="flex items-center gap-2 sm:gap-10">
              <Button
                secondary
                icon={<Menu size={24} />}
                onClick={() => setIsDrawerOpen(true)}
              />
            </div>

            <NavLogo onClick={(e) => handleNavigate(e, '/')} />
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
