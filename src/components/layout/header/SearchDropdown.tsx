import type { Anime } from '../../../types/anime';
import { AnimatePresence, motion } from 'framer-motion';
import Button from '../../ui/Button';
import SearchDropdownItem from './SearchDropdownItem';

interface SearchDropdownProps {
  animeList: Anime[] | undefined;
  isLoading: boolean;
  isVisible: boolean;
  onSeeMore: () => void;
  searchQuery: string;
}

export const SearchDropdown = ({
  animeList,
  isLoading,
  isVisible,
  onSeeMore,
  searchQuery,
}: SearchDropdownProps) => {
  return (
    <AnimatePresence>
      {isVisible && animeList && (
        <motion.div
          key="search-dropdown"
          initial={{ opacity: 0, y: -10, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.98 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="absolute top-full left-0 right-0 mt-2 bg-zinc-900/90 backdrop-blur-xl 
                       border border-white/10 rounded-2xl overflow-hidden z-50 shadow-2xl">
          <div className="p-2 flex flex-col gap-1">
            {animeList.slice(0, 6).map((anime) => (
              <SearchDropdownItem key={anime.mal_id} anime={anime} />
            ))}

            {/* Navigate to anime list and apply filter */}
            {animeList.length > 6 && searchQuery.trim() !== '' && (
              <Button onClick={onSeeMore}>Show more results</Button>
            )}

            {animeList.length === 0 && !isLoading && (
              <div className="p-4 text-center text-gray-500 text-sm">
                No results found
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchDropdown;
