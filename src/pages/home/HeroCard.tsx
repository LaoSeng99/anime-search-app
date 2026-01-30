import { Heart, Loader2 } from 'lucide-react';
import Button from '../../components/ui/Button';
import TrailerVideo from './TrailerVideo';
import { useQuery } from '@tanstack/react-query';
import { getSeasonNow } from '../../services/seasonService';
import MotionImage from '../../components/ui/MotionImage';
import { useNavigate } from 'react-router';
import ErrorState from '../../components/ui/ErrorState';

const HeroCard = () => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['anime-random'],
    queryFn: async () => {
      const res = await getSeasonNow({ page: 1, limit: 25, filter: 'tv' });

      const list = res.data.filter((anime) => (anime.score ?? 0) > 7.5);
      const targetList = list.length > 0 ? list : res.data;

      const index = Math.floor(Math.random() * targetList.length);
      return targetList[index];
    },
    staleTime: Infinity,
    retry: 2,
  });

  const navigate = useNavigate();
  const handleNavigate = (id: number) => {
    navigate(`/anime/${id}`);
  };

  if (isLoading) {
    return (
      <div className="relative w-full aspect-video rounded-xl flex items-center justify-center bg-gray-900 overflow-hidden">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <ErrorState
        title="Unable to load spotlight"
        onRetry={refetch}
        className={
          'relative w-full aspect-video rounded-xl flex flex-col items-center justify-center bg-gray-900 border border-gray-800 text-center px-4'
        }
      />
    );
  }

  return (
    <div className="group relative w-full aspect-video rounded-xl overflow-hidden shadow-2xl bg-black">
      <TrailerVideo
        embedUrl={data.trailer?.embed_url ?? ''}
        backdropUrl={data.images.webp.large_image_url}></TrailerVideo>
      <div
        className="absolute inset-0 z-0 scale-110 blur-2xl opacity-50 transition-transform duration-700 group-hover:scale-100"
        style={{
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      />

      <div className="absolute inset-0 z-10 bg-linear-to-r from-black via-black/10 to-transparent" />
      <div className="absolute inset-0 z-10 bg-linear-to-t from-black via-transparent to-transparent" />

      <section className="relative z-20 h-full flex flex-col justify-center px-8 md:px-16 gap-6 max-w-3xl">
        {/* Badges */}
        <div className="flex gap-2">
          {data.score && (
            <span className="bg-yellow-500 text-black px-2 py-0.5 rounded text-sm font-bold">
              ★ {data.score}
            </span>
          )}
          <span className="bg-white/20 backdrop-blur-md text-white px-2 py-0.5 rounded text-sm capitalize">
            {data.season} {data.year}
          </span>
        </div>

        {/* Information */}
        <div className="space-y-4">
          <h1 className="text-white text-4xl md:text-6xl font-extrabold tracking-tight line-clamp-2 drop-shadow-xl">
            {data.title_english || data.title}
          </h1>
          <p className="text-gray-200 text-sm md:text-lg leading-relaxed drop-shadow-md line-clamp-3 max-w-xl italic">
            {data.synopsis}
          </p>
        </div>

        {/* Action */}
        <div className="flex items-center gap-4">
          <Button
            size={'lg'}
            outline={true}
            variant="primary"
            className="hover:scale-105 transition-transform"
            onClick={() => {
              handleNavigate(data.mal_id);
            }}>
            Learn More
          </Button>
          <Button size={'lg'} leftIcon={<Heart />}>
            To Favourite
          </Button>
        </div>
      </section>

      {/* Right floating poster */}
      <div className="absolute right-[10%] top-1/2 -translate-y-1/2 hidden lg:block z-20 w-64 shadow-[0_0_50px_rgba(0,0,0,0.5)] transform rotate-3 hover:rotate-0 transition-all duration-500">
        <MotionImage
          loading={'eager'}
          src={data.images.webp.large_image_url}
          alt={data.title}
          className="rounded-lg object-cover w-full h-full border border-white/10"
        />
      </div>
    </div>
  );
};
export default HeroCard;
