import { Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router';
import Button from '../../../components/ui/Button';
import ErrorState from '../../../components/ui/ErrorState';
import FavouriteButton from '../../../components/ui/FavouriteButton';
import MotionImage from '../../../components/ui/MotionImage';
import TrailerVideo from '../../../components/TrailerVideo';
import { useRandomAnime } from '../../../hooks/useRandomAnime';
import { cn } from '../../../utils/ui.util';

const HeroCard = () => {
  const {
    selected: anime,
    isLoading,
    isError,
    handleRefetch,
    rePick,
  } = useRandomAnime();

  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div
        className={cn([
          'relative w-full aspect-video rounded-xl flex items-center justify-center bg-gray-900 overflow-hidden',
        ])}>
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
      </div>
    );
  }

  if (isError || !anime) {
    return (
      <ErrorState title="Unable to load spotlight" onRetry={handleRefetch} />
    );
  }

  return (
    <div
      className={cn(
        'group relative w-full rounded-xl overflow-hidden shadow-2xl bg-black flex flex-col',
        'pt-80 pb-10',
        'md:pt-60 md:pb-30',
        'lg:pt-20 lg:pb-0 lg:aspect-video',
      )}>
      <TrailerVideo
        onVideoEnd={rePick}
        embedUrl={anime.trailer?.embed_url ?? ''}
        backdropUrl={anime.images.webp.large_image_url}
      />

      <div
        aria-label="mobile-overlay"
        className="absolute inset-0 z-10 bg-black/40 md:hidden"
      />
      <div
        aria-label="left-shadow"
        className={cn(
          'absolute inset-0 z-10 bg-linear-to-b from-transparent via-black/60 to-black',
          'md:bg-linear-to-r md:from-black md:via-black/40 md:to-transparent',
        )}
      />

      <section
        className={cn(
          'relative z-20 mt-auto px-6 py-8 gap-4 flex flex-col justify-end',
          'bg-black/20 backdrop-blur-sm rounded-t-3xl border-t border-white/10',
          // Tablet (md)
          'md:h-full md:justify-center md:px-16 md:gap-6 md:bg-transparent md:backdrop-blur-0 md:border-none',
          // Desktop (lg)
          'lg:max-w-3xl',
        )}>
        {/* Badges */}
        <div className="flex gap-2 items-center">
          {anime.score && (
            <span className="bg-yellow-500 text-black px-2 py-0.5 rounded text-xs md:text-sm font-bold shadow-lg">
              ★ {anime.score}
            </span>
          )}
          <span className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-2 py-0.5 rounded text-xs md:text-sm capitalize">
            {anime.season} {anime.year}
          </span>
        </div>

        {/* Information */}
        <div className="space-y-2 md:space-y-4">
          <h1
            className={cn(
              'text-white font-extrabold tracking-tight drop-shadow-2xl line-clamp-2',
              'text-2xl', // Mobile
              'md:text-4xl', // Tablet
              'lg:text-6xl', // Desktop
            )}>
            {anime.title_english || anime.title}
          </h1>
          <p
            className={cn(
              'text-gray-200 leading-relaxed drop-shadow-md line-clamp-3 italic',
              'text-xs', // Mobile
              'md:text-base', // Tablet
              'lg:text-lg', // Desktop
              'md:max-w-xl',
            )}>
            {anime.synopsis}
          </p>
        </div>

        {/* Action */}
        <div className="flex items-center gap-3 md:gap-4 mt-2">
          <Button
            size={'lg'}
            outline
            className="flex-1 md:flex-none hover:scale-105 transition-transform text-sm md:text-base py-2 md:py-3"
            onClick={() => navigate(`/anime/${anime.mal_id}`)}>
            Learn More
          </Button>
          <FavouriteButton anime={anime}></FavouriteButton>
        </div>
      </section>

      {/* Right floating poster */}
      <div className="absolute right-[8%] top-1/2 -translate-y-1/2 hidden lg:block z-20 w-64 shadow-[0_0_50px_rgba(0,0,0,0.6)] transform rotate-3 hover:rotate-0 transition-all duration-500">
        <MotionImage
          loading={'eager'}
          src={anime.images.webp.large_image_url}
          alt={anime.title}
          className="rounded-lg object-cover w-full h-full border-2 border-white/20"
        />
      </div>
    </div>
  );
};
export default HeroCard;
