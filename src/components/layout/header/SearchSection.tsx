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

  useClickOutside(containerRef, () => {
    setIsExpanded(false);
    setIsResultsVisible(false);
  });

  useKeyboardAccessibility({
    searchBoxRef,
    onEscape: handleClear,
    enabled: !isForcedDisabled,
  });

  return (
    <div
      ref={containerRef}
      className={cn(
        'transition-all duration-300 ease-in-out flex justify-end items-center',
        isExpanded ? 'w-full' : 'w-10 lg:w-auto',
      )}>
      {!isExpanded && (
        <Button
          secondary
          className="lg:hidden"
          onClick={() => {
            setIsExpanded(true);
            setIsResultsVisible(true);
          }}
          icon={<Search size={22} />}
        />
      )}
      <div
        className={cn(
          'transition-all duration-300 overflow-hidden lg:block',
          isExpanded
            ? 'w-full opacity-100'
            : 'w-0 opacity-0 lg:w-auto lg:opacity-100',
        )}>
        <div
          className="relative flex-1 group"
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
        </div>
        <SearchDropdown
          animeList={data?.data}
          isLoading={isLoading}
          isVisible={isResultsVisible}
          onSeeMore={handleSeeMore}
          searchQuery={searchQuery}
        />
      </div>
    </div>
  );
};

export default SearchSection;
