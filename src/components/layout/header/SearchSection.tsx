import { useState, useRef } from 'react';
import { Search } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';
import { useLocation, useNavigate } from 'react-router';
import { getTopAnime, getAnime } from '../../../services/animeService';
import { SEARCH_DEBOUNCE } from '../../../types/app.constant';
import { useUrlQueryState } from '../../../hooks/useUrlQueryState';
import { useClickOutside } from '../../../hooks/useClickOutside';
import { useKeyboardAccessibility } from '../../../hooks/useKeyboardAccessibility';
import { useKeyboardAccessibilityState } from '../../../hooks/useKeyboardAccessibilityState';
import SearchBox, { type SearchBoxHandle } from '../../ui/SearchBox';
import SearchDropdown from './SearchDropdown';
import Button from '../../ui/Button';
import { cn } from '../../../utils/ui.util';
import { createPortal } from 'react-dom';

interface SearchSectionProps {
  isExpanded: boolean;
  setIsExpanded: (val: boolean) => void;
}

const SearchSection = ({ isExpanded, setIsExpanded }: SearchSectionProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch] = useDebounce(searchQuery, SEARCH_DEBOUNCE);
  const [isResultsVisible, setIsResultsVisible] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const searchBoxRef = useRef<SearchBoxHandle>(null);

  const navigate = useNavigate();
  const location = useLocation();
  const { setSingleParam } = useUrlQueryState();
  const isForcedDisabled = useKeyboardAccessibilityState(
    (s) => s.isForcedDisabled,
  );

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

  const handleClear = () => setIsResultsVisible(false);

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

  const handleViewItem = (id: string | number) => {
    setIsResultsVisible(false);
    navigate(`/anime/${id}`);
  };

  useClickOutside(containerRef, () => {
    setIsResultsVisible(false);
  });

  useKeyboardAccessibility({
    searchBoxRef,
    onEscape: handleClear,
    enabled: !isForcedDisabled,
  });

  return (
    <div
      className={cn(
        'transition-all duration-300 ease-in-out flex flex-1 justify-end items-center w-full',
      )}>
      {!isExpanded && (
        <Button
          secondary
          className="md:hidden"
          onClick={() => {
            setIsExpanded(true);
            setIsResultsVisible(true);
          }}
          icon={<Search size={22} />}
        />
      )}

      <div
        ref={containerRef}
        className={cn([
          'transition-all duration-300 flex justify-end items-center w-full relative group max-w-140',
          isExpanded
            ? 'w-full'
            : 'absolute w-0 opacity-0 md:flex md:w-full md:opacity-100 md:relative ',
        ])}
        onFocus={() => setIsResultsVisible(true)}>
        <SearchBox
          ref={searchBoxRef}
          value={searchQuery}
          onFocus={() => {
            if (!hasInteracted) setHasInteracted(true);
          }}
          onChange={setSearchQuery}
          onClear={handleClear}
          isLoading={isLoading || isFetching}
        />

        <SearchDropdown
          animeList={data?.data}
          isLoading={isLoading}
          isVisible={isResultsVisible}
          onSeeMore={handleSeeMore}
          onViewItem={handleViewItem}
          searchQuery={searchQuery}
        />
      </div>

      {isExpanded &&
        createPortal(
          <div
            className="fixed w-full h-full bg-transparent top-0 left-0 z-1"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsExpanded(false);
            }}></div>,
          document.body,
        )}
    </div>
  );
};

export default SearchSection;
