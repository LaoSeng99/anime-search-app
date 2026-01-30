import type { Anime } from '../../../types/anime';
import MotionImage from '../../ui/MotionImage';

const SearchDropdownItem = ({ anime }: { anime: Anime }) => {
  const cleanSynopsis = anime.synopsis?.replace(
    /\[Written by MAL Rewrite\]/g,
    '',
  );

  return (
    <div className="flex items-start gap-4 p-3 hover:bg-white/10 rounded-xl cursor-pointer transition-colors group">
      <MotionImage
        src={anime.images.webp.small_image_url}
        alt={anime.title}
        className="w-12 h-16 object-cover rounded-lg shadow-sm"
      />

      <div className="flex flex-col flex-1 min-w-0">
        <div className="flex justify-between items-start gap-2">
          <span className="text-sm font-semibold text-gray-100 line-clamp-1 group-hover:text-blue-400 transition-colors">
            {anime.title}
          </span>
          {anime.score && (
            <span className="text-[10px] font-bold bg-yellow-500/20 text-yellow-500 px-1.5 py-0.5 rounded italic">
              ★ {anime.score}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 mt-0.5 text-[11px] text-gray-500">
          <span>{anime.year ?? 'N/A'}</span>
          <span>•</span>
          <span>{anime.type}</span>
          <span>•</span>
          <span className="line-clamp-1">
            {anime.genres
              .map((g) => g.name)
              .slice(0, 2)
              .join(', ')}
          </span>
        </div>

        {anime.synopsis && (
          <p className="text-[11px] text-gray-400 mt-1.5 line-clamp-2 leading-relaxed">
            {cleanSynopsis}
          </p>
        )}
      </div>
    </div>
  );
};

export default SearchDropdownItem;
