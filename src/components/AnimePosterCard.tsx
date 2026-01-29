import type { Anime } from '../types/anime';
import MotionImage from './ui/MotionImage';

const AnimePosterCard = ({ anime }: { anime: Anime }) => {
  return (
    <div className="relative w-64 min-w-[16rem] h-96 rounded-2xl overflow-hidden shadow-lg group cursor-pointer bg-gray-900">
      {/* Background Image */}
      <MotionImage
        src={anime.images.webp.image_url}
        alt={anime.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />

      {/* Gradient Overlay - 增加 hover 时的深度 */}
      <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Info Container */}
      <div className="absolute bottom-0 left-0 p-4 w-full transition-all duration-300 ease-in-out">
        {/* Title & Basic Info */}
        <h3 className="text-white text-xl font-bold truncate">{anime.title}</h3>
        <p className="text-gray-300 text-sm mb-0 transition-all duration-300 group-hover:mb-2">
          {`${anime.year ?? 'N/A'},`} {anime.genres[0]?.name ?? ''}
        </p>

        {/* More Information - Hover 时展示的内容 */}
        <div className="max-h-0 opacity-0 overflow-hidden transition-all duration-300 ease-in-out group-hover:max-h-32 group-hover:opacity-100">
          <p className="text-gray-400 text-xs line-clamp-3 mb-2">
            {anime.synopsis ?? 'No description available.'}
          </p>
          <div className="flex gap-2">
            <span className="text-[10px] bg-white/20 text-white px-2 py-0.5 rounded">
              Score: {anime.score}
            </span>
            <span className="text-[10px] bg-blue-500/50 text-white px-2 py-0.5 rounded">
              {anime.type}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AnimePosterCard;
