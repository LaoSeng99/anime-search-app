import { useRef, useState } from 'react';
import SearchBox from '../ui/SearchBox';
import { getAnime } from '../../services/animeService';
import { useQuery } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';
import { useClickOutside } from '../../hooks/useClickOutside';
import MotionImage from '../ui/MotionImage';

const AnimeSearchBox = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isResultsVisible, setIsResultsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['search-anime', searchQuery],
    queryFn: async () => await getAnime({ limit: 6, q: searchQuery }),
    enabled: searchQuery.length > 0, // Don't fetch if query is empty
    staleTime: 1000 * 60 * 5,
  });

  useClickOutside(containerRef, () => {
    setIsResultsVisible(false);
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
          onSearch={setSearchQuery}
          onClear={() => setIsResultsVisible(false)}
          isLoading={isLoading || isFetching}
          initialValue={searchQuery}
        />
      </div>

      {/* Results Dropdown */}
      <AnimatePresence>
        {isResultsVisible && searchQuery.length > 0 && data?.data && (
          <motion.div
            key="search-dropdown"
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="absolute top-full left-0 right-0 mt-2 bg-zinc-900/90 backdrop-blur-xl 
                       border border-white/10 rounded-2xl overflow-hidden z-50 shadow-2xl">
            <div className="p-2 flex flex-col gap-1">
              {data.data.map((anime) => (
                <div
                  key={anime.mal_id}
                  className="flex items-center gap-3 p-2 hover:bg-white/10 rounded-xl cursor-pointer transition-colors">
                  <MotionImage
                    src={anime.images.webp.small_image_url}
                    alt={anime.title}
                    className="w-10 h-14 object-cover rounded-md"
                  />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-200 line-clamp-1">
                      {anime.title}
                    </span>
                    <span className="text-xs text-gray-500">
                      {`${anime.year ?? 'N/A'},`} {anime.genres[0]?.name ?? ''}
                    </span>
                  </div>
                </div>
              ))}

              {data.data.length === 0 && !isLoading && (
                <div className="p-4 text-center text-gray-500 text-sm">
                  No results found
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AnimeSearchBox;
