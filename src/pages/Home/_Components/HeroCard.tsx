import { Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router';
import Button from '../../../components/ui/Button';
import ErrorState from '../../../components/ui/ErrorState';
import FavouriteButton from '../../../components/ui/FavouriteButton';
import MotionImage from '../../../components/ui/MotionImage';
import TrailerVideo from '../../../components/TrailerVideo';
import { useRandomAnime } from '../../../hooks/useRandomAnime';

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
      <div className="relative w-full aspect-video rounded-xl flex items-center justify-center bg-gray-900 overflow-hidden">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
      </div>
    );
  }

  if (isError || !anime) {
    return (
      <ErrorState
        title="Unable to load spotlight"
        onRetry={handleRefetch}
        className={
          'relative w-full aspect-video rounded-xl flex flex-col items-center justify-center bg-gray-900 border border-gray-800 text-center px-4'
        }
      />
    );
  }

  return (
    <div className="group relative w-full aspect-video rounded-xl overflow-hidden shadow-2xl bg-black">
      <TrailerVideo
        onVideoEnd={rePick}
        embedUrl={anime.trailer?.embed_url ?? ''}
        backdropUrl={anime.images.webp.large_image_url}></TrailerVideo>

      <div
        aria-label="left-shadow"
        className="absolute inset-0 z-10 bg-linear-to-r from-black via-black/10 to-transparent"
      />
      <div
        aria-label="bottom-shadow"
        className="absolute inset-0 z-10 bg-linear-to-t from-black via-transparent to-transparent"
      />

      <section className="relative z-20 h-full flex flex-col justify-center px-8 md:px-16 gap-6 max-w-3xl">
        {/* Badges */}
        <div className="flex gap-2">
          {anime.score && (
            <span className="bg-yellow-500 text-black px-2 py-0.5 rounded text-sm font-bold">
              ★ {anime.score}
            </span>
          )}
          <span className="bg-white/20 backdrop-blur-md text-white px-2 py-0.5 rounded text-sm capitalize">
            {anime.season} {anime.year}
          </span>
        </div>

        {/* Information */}
        <div className="space-y-4">
          <h1 className="text-white text-4xl md:text-6xl font-extrabold tracking-tight line-clamp-2 drop-shadow-xl">
            {anime.title_english || anime.title}
          </h1>
          <p className="text-gray-200 text-sm md:text-lg leading-relaxed drop-shadow-md line-clamp-3 max-w-xl italic">
            {anime.synopsis}
          </p>
        </div>

        {/* Action */}
        <div className="flex items-center gap-4">
          <Button
            size={'lg'}
            outline
            className="hover:scale-105 transition-transform"
            onClick={() => {
              navigate(`/anime/${anime.mal_id}`);
            }}>
            Learn More
          </Button>

          <FavouriteButton anime={anime}></FavouriteButton>
        </div>
      </section>

      {/* Right floating poster */}
      <div className="absolute right-[10%] top-1/2 -translate-y-1/2 hidden lg:block z-20 w-64 shadow-[0_0_50px_rgba(0,0,0,0.5)] transform rotate-3 hover:rotate-0 transition-all duration-500">
        <MotionImage
          loading={'eager'}
          src={anime.images.webp.large_image_url}
          alt={anime.title}
          className="rounded-lg object-cover w-full h-full border border-white/10"
        />
      </div>
    </div>
  );
};
export default HeroCard;
