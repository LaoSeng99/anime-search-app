import { useRef, useState } from 'react';
import SearchBox, { type SearchBoxHandle } from '../../ui/SearchBox';
import { getAnime, getTopAnime } from '../../../services/animeService';
import { useQuery } from '@tanstack/react-query';
import { useClickOutside } from '../../../hooks/useClickOutside';
import SearchDropdown from './SearchDropdown';
import { USE_QUERY_STALE } from '../../../types/app.constant';

const AnimeSearchBox = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isResultsVisible, setIsResultsVisible] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false); // lazy load for search

  const containerRef = useRef<HTMLDivElement>(null);
  const searchBoxRef = useRef<SearchBoxHandle>(null);

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['search-anime', searchQuery],
    queryFn: async () => {
      if (searchQuery.trim() === '') {
        return await getTopAnime({ limit: 5, filter: 'airing' });
      }
      return await getAnime({ limit: 7, q: searchQuery });
    },
    enabled: hasInteracted,
    staleTime: USE_QUERY_STALE,
  });

  useClickOutside(containerRef, () => {
    setIsResultsVisible(false);
  });

  const handleSeeMore = () => {
    if (searchQuery.trim() !== '') {
      setIsResultsVisible(false);
      setSearchQuery('');
      searchBoxRef.current?.clear();
    }
  };

  const handleClear = () => {
    setIsResultsVisible(false);
  };

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
          onFocus={() => {
            if (!hasInteracted) setHasInteracted(true);
          }}
          onSearch={setSearchQuery}
          onClear={() => handleClear}
          isLoading={isLoading || isFetching}
          initialValue={searchQuery}
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

export default AnimeSearchBox;
