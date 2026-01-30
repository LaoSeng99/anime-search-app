import { useRef, useState } from 'react';
import SearchBox from '../../ui/SearchBox';
import { getAnime } from '../../../services/animeService';
import { useQuery } from '@tanstack/react-query';
import { useClickOutside } from '../../../hooks/useClickOutside';
import SearchDropdown from './SearchDropdown';
import { useNavigate } from 'react-router';

const AnimeSearchBox = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isResultsVisible, setIsResultsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['search-anime', searchQuery],
    queryFn: async () => {
      if (searchQuery.trim() === '') {
        return await getAnime;
      }
      return await getAnime({ limit: 7, q: searchQuery });
    },
    enabled: searchQuery.length > 0, // Don't fetch if query is empty
    staleTime: 1000 * 60 * 5,
  });

  const navigate = useNavigate();

  useClickOutside(containerRef, () => {
    setIsResultsVisible(false);
  });

  const handleSeeMore = () => {
    if (searchQuery.trim() !== '') {
      navigate(`/anime?q=${encodeURIComponent(searchQuery)}`);
      setIsResultsVisible(false);
      setSearchQuery('');
    }
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
          onSearch={setSearchQuery}
          onClear={() => setIsResultsVisible(false)}
          isLoading={isLoading || isFetching}
          initialValue={searchQuery}
        />
      </div>

      <SearchDropdown
        animeList={data?.data}
        isLoading={isLoading}
        isVisible={isResultsVisible}
        onSeeMore={handleSeeMore}></SearchDropdown>
    </div>
  );
};

export default AnimeSearchBox;
