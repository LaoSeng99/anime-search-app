import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import AnimePosterCard from '../../../components/AnimePosterCard';
import AnimeCardSkeleton from '../../../components/AnimePosterCardSkeleton';
import { HorizontalCarousel } from '../../../components/ui/HorizontalCarousel';
import LazyLoadSection from '../../../components/ui/LazyLoadSection';
import { getSeasonNow } from '../../../services/seasonService';

const TrendingCard = () => {
  return (
    <LazyLoadSection rootMargin="0px">
      {(inView) => <TrendingContent isVisible={inView} />}
    </LazyLoadSection>
  );
};

const TrendingContent = ({ isVisible }: { isVisible: boolean }) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['anime-season'],
    queryFn: async () => {
      const data = await getSeasonNow({ limit: 10, page: 1 });
      return data;
    },
    enabled: isVisible,
  });

  const allAnime = useMemo(() => {
    if (!data) return [];
    const flattened = data?.data.map((anime) => anime);

    const uniqueMap = new Map();
    flattened.forEach((item) => uniqueMap.set(item.mal_id, item));

    return Array.from(uniqueMap.values());
  }, [data]);

  const skeletonNodes = [...Array(6)].map((_, i) => (
    <AnimeCardSkeleton key={i} className="min-w-65" />
  ));

  const posterCardNodes = allAnime.map((anime) => (
    <AnimePosterCard key={anime.mal_id} anime={anime} className="min-w-65" />
  ));

  return (
    <div
      className="
    lg:-translate-y-40 md:-translate-y-20
    relative z-20 text-white  overflow-hidden">
      <h2 className="text-2xl font-medium text-white  px-8 md:px-16 pb-4">
        Trending Now
      </h2>

      <HorizontalCarousel error={error} refetch={refetch} isLoading={isLoading}>
        {isLoading || !isVisible || error ? skeletonNodes : posterCardNodes}
      </HorizontalCarousel>
    </div>
  );
};

export default TrendingCard;
