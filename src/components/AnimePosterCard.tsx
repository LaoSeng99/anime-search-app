import type { Anime } from '../types/anime';
import MotionImage from './ui/MotionImage';

const AnimePosterCard = ({ anime }: { anime: Anime }) => {
  return (
    <div className="relative w-64 min-w-[16rem] h-96 rounded-2xl overflow-hidden shadow-xl group cursor-pointer bg-gray-900 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20">
      {/* Background Image */}
      <MotionImage
        src={anime.images.webp.image_url}
        alt={anime.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
      />

      {/* gradient layer */}
      <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-90" />

      {/* Info Container */}
      <div className="absolute bottom-0 left-0 p-5 w-full">
        <div className="transition-transform duration-300 ease-out group-hover:-translate-y-2">
          {/* Title */}
          <h3 className="text-white text-lg font-bold leading-tight line-clamp-2 drop-shadow-md">
            {anime.title}
          </h3>

          {/* Basic Info Line */}
          <div className="flex items-center gap-2 mt-1.5">
            <span className="text-blue-400 text-xs font-medium">
              {anime.year ?? 'N/A'}
            </span>
            <span className="text-gray-400 text-[10px]">|</span>
            <span className="text-gray-300 text-xs line-clamp-1">
              {anime.genres
                .map((g) => g.name)
                .slice(0, 2)
                .join(', ')}
            </span>
          </div>

          {/* More Information - show on hover*/}
          <div className="grid grid-rows-[0fr] opacity-0 transition-all duration-300 ease-in-out group-hover:grid-rows-[1fr] group-hover:opacity-100 group-hover:mt-3">
            <div className="overflow-hidden">
              <p className="text-gray-300/90 text-xs line-clamp-3 leading-relaxed border-l-2 border-blue-500/50 pl-2">
                {anime.synopsis?.replace(/\[Written by MAL Rewrite\]/g, '') ??
                  'No description available.'}
              </p>

              <div className="flex items-center gap-3 mt-4">
                {/* Score with Glass Effect */}
                <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-white/10 backdrop-blur-md border border-white/10">
                  <span className="text-yellow-400 text-[10px]">★</span>
                  <span className="text-white text-[11px] font-bold">
                    {anime.score ?? 'N/A'}
                  </span>
                </div>

                {/* Type Badge */}
                <span className="px-2 py-1 rounded-lg bg-blue-600/30 border border-blue-500/30 text-blue-200 text-[10px] font-semibold uppercase tracking-wider">
                  {anime.type}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AnimePosterCard;
