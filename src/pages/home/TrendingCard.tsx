import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { useRef } from 'react';
import AnimePosterCard from '../../components/AnimePosterCard';
import AnimeCardSkeleton from '../../components/AnimePosterCardSkeleton';
import { useMaxScroll } from '../../hooks/useMaxScroll';
import { getSeasonNow } from '../../services/seasonService';
import LazyLoadSection from '../../components/ui/LazyLoadSection';
import ErrorState from '../../components/ui/ErrorState';
import { USE_QUERY_STALE } from '../../types/app.constant';

const TrendingCard = () => {
  return (
    <LazyLoadSection rootMargin="0px">
      {(inView) => <TrendingContent isVisible={inView} />}
    </LazyLoadSection>
  );
};

const TrendingContent = ({ isVisible }: { isVisible: boolean }) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['anime-season'],
    queryFn: async () => {
      const data = await getSeasonNow({ limit: 10, page: 1 });
      return data;
    },
    enabled: isVisible,
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
    <div
      className="
    lg:-translate-y-40 md:-translate-y-20
    relative z-20 text-white  overflow-hidden">
      <h2 className="text-2xl font-medium text-white  px-8 md:px-16 pb-4">
        Trending Now
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
                  title="Unable to load trending show"
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

export default TrendingCard;
