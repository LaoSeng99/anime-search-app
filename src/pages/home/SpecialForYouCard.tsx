import { useQuery } from '@tanstack/react-query';
import { getAnime } from '../../services/animeService';
import { useRef } from 'react';
import { motion } from 'framer-motion';
import AnimeCardSkeleton from '../../components/AnimePosterCardSkeleton';
import AnimePosterCard from '../../components/AnimePosterCard';
import { useMaxScroll } from '../../hooks/useMaxScroll';
import ErrorState from '../../components/ui/ErrorState';
import LazyLoadSection from '../../components/ui/LazyLoadSection';
import { USE_QUERY_STALE } from '../../types/app.constant';

const SpecialForYouCard = () => {
  return (
    <LazyLoadSection rootMargin="0px">
      {(inView) => <SpecialForYouContent isVisible={inView} />}
    </LazyLoadSection>
  );
};

const SpecialForYouContent = ({ isVisible }: { isVisible: boolean }) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['anime-special'],
    queryFn: async () => {
      const data = await getAnime({ limit: 10, page: 1 });
      return data;
    },
    staleTime: USE_QUERY_STALE,
  });
  const maxScroll = useMaxScroll(carouselRef, [isLoading]);

  const skeletonNodes = [...Array(6)].map((_, i) => (
    <AnimeCardSkeleton key={i} />
  ));

  const posterCardNodes = data?.data.map((anime) => (
    <AnimePosterCard key={anime.mal_id} anime={anime} />
  ));

  return (
    <div className="relative z-20 text-white lg:-translate-y-40 md:-translate-y-20   overflow-hidden">
      <h2 className="text-2xl font-medium text-white  px-8 md:px-16 pb-4">
        Special for you
      </h2>
      <div className="flex flex-row overflow-x-auto snap-x">
        <div className="overflow-hidden w-full">
          {/* horizontal carousel */}
          <motion.div
            ref={carouselRef}
            className="cursor-grab active:cursor-grabbing relative">
            {error && (
              <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/70 backdrop-blur-[2px] rounded-lg ">
                <ErrorState
                  title="Unable to load special show"
                  onRetry={refetch}
                />
              </div>
            )}

            <motion.div
              drag={error ? false : 'x'}
              dragConstraints={{ right: 0, left: -maxScroll }}
              className="flex gap-6  px-8 md:px-16">
              {isLoading || !isVisible || error
                ? skeletonNodes
                : posterCardNodes}
              <div className="min-w-10 h-1" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
export default SpecialForYouCard;
