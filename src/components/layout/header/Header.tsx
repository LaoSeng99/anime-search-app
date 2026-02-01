import { useLocation, useNavigate } from 'react-router';
import { useKeyboardAccessibilityState } from '../../../hooks/useKeyboardAccessibilityState';
import { useKeyboardAccessibility } from '../../../hooks/useKeyboardAccessibility';
import { useQuery } from '@tanstack/react-query';
import { useRef, useState } from 'react';
import { useClickOutside } from '../../../hooks/useClickOutside';
import { getTopAnime, getAnime } from '../../../services/animeService';
import SearchBox, { type SearchBoxHandle } from '../../ui/SearchBox';
import SearchDropdown from './SearchDropdown';
import { SEARCH_DEBOUNCE } from '../../../types/app.constant';
import { useUrlQueryState } from '../../../hooks/useUrlQueryState';
import { useDebounce } from 'use-debounce';
import { Keyboard } from 'lucide-react';
import { useDialog } from '../../../hooks/useDialog';
import KeyboardShortcutContent from '../../KeyboardShortcutContent';

interface NavItem {
  name: string;
  href: string;
}

const Header = () => {
  const navItems: NavItem[] = [
    { name: 'Home', href: '/' },
    { name: 'Catalog', href: '/anime' },
    { name: 'Favourites', href: '/favourites' },
  ];

  const { custom } = useDialog();
  const navigate = useNavigate();
  const handleNavigate = (e: React.MouseEvent, href: string) => {
    e.preventDefault(); // prevent href"#"
    navigate(href);
  };

  return (
    <header className="fixed top-0 z-50 w-full h-20 backdrop-blur-md border-b  text-white border-white/10 flex items-center px-10 ">
      <nav className="flex items-center justify-between w-full ">
        {/*  Logo Section */}
        <div className="flex items-center gap-10">
          <a
            onClick={(e) => handleNavigate(e, '/')}
            className="text-3xl font-extrabold tracking-tighter cursor-pointer font-heading drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] text-white antialiased">
            AnimeSearch
          </a>

          <ul className="flex items-center gap-6">
            {navItems.map((item) => (
              <li key={item.name}>
                <a
                  onClick={(e) => handleNavigate(e, item.href)}
                  href={item.href}
                  className={`
            px-3 py-2 text-md font-semibold transition-all duration-200
            text-gray-200 hover:text-white 
            drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] `}>
                  {item.name}
                </a>
              </li>
            ))}

            <li className="flex items-center gap-4 ml-4 py-1 px-3 border-l border-white/30 text-xs font-medium text-gray-300 drop-shadow-[0_1.5px_1.5px_rgba(0,0,0,1)]">
              {/* Search Shortcut */}
              <div
                className="flex items-center gap-2 group cursor-help "
                onClick={() => {
                  custom('Keyboard shortcut', <KeyboardShortcutContent />);
                }}>
                <div className="flex items-center justify-center w-8 h-8 bg-white/10 border border-white/20 rounded shadow-inner">
                  <Keyboard size={24} className="text-white" />
                </div>
                <span className="font-semibold transition-all duration-200  text-[12px]  text-gray-200 hover:text-white  drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] uppercase tracking-wider ">
                  Keyboard Shortcut
                </span>
              </div>
            </li>
          </ul>
        </div>

        <AnimeSearchBox />
      </nav>
    </header>
  );
};

const AnimeSearchBox = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch] = useDebounce(searchQuery, SEARCH_DEBOUNCE);

  const [isResultsVisible, setIsResultsVisible] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false); // lazy load for search

  const containerRef = useRef<HTMLDivElement>(null);
  const searchBoxRef = useRef<SearchBoxHandle>(null);

  const isForcedDisabled = useKeyboardAccessibilityState(
    (s) => s.isForcedDisabled,
  );
  const navigate = useNavigate();
  const location = useLocation();

  const { setSingleParam } = useUrlQueryState();
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['search-anime', debouncedSearch],
    queryFn: async () => {
      if (debouncedSearch.trim() === '') {
        return await getTopAnime({ limit: 5, filter: 'airing' });
      }
      return await getAnime({ limit: 7, q: debouncedSearch });
    },
    enabled: hasInteracted,
  });

  const handleSeeMore = () => {
    if (searchQuery.trim() !== '') {
      setIsResultsVisible(false);
      setSearchQuery('');
      if (location.pathname === '/anime') {
        setSingleParam('q', searchQuery);
        return;
      }
      navigate(`/anime?q=${searchQuery}`);
    }
  };

  const handleClear = () => {
    setIsResultsVisible(false);
  };

  useClickOutside(containerRef, () => {
    setIsResultsVisible(false);
  });

  useKeyboardAccessibility({
    searchBoxRef: searchBoxRef,
    onEscape: handleClear,
    enabled: !isForcedDisabled,
  });

  return (
    <div
      ref={containerRef}
      className="flex flex-col flex-1 max-w-xl gap-6 ml-10 relative">
      <div
        className="relative flex-1 group"
        onFocus={() => setIsResultsVisible(true)} // Re-show when focused
      >
        <SearchBox
          ref={searchBoxRef}
          value={searchQuery}
          onFocus={() => {
            if (!hasInteracted) setHasInteracted(true);
          }}
          onChange={setSearchQuery}
          onClear={() => handleClear}
          isLoading={isLoading || isFetching}
        />
      </div>

      <SearchDropdown
        animeList={data?.data}
        isLoading={isLoading}
        isVisible={isResultsVisible}
        onSeeMore={handleSeeMore}
        searchQuery={searchQuery}></SearchDropdown>
    </div>
  );
};

export default Header;
