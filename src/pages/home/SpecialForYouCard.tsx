import { useQuery } from '@tanstack/react-query';
import { getAnime } from '../../services/animeService';
import { useMemo } from 'react';
import AnimeCardSkeleton from '../../components/AnimePosterCardSkeleton';
import AnimePosterCard from '../../components/AnimePosterCard';

import LazyLoadSection from '../../components/ui/LazyLoadSection';
import { HorizontalCarousel } from '../../components/ui/HorizontalCarousel';

const SpecialForYouCard = () => {
  return (
    <LazyLoadSection rootMargin="50px">
      {(inView) => <SpecialForYouContent isVisible={inView} />}
    </LazyLoadSection>
  );
};

const SpecialForYouContent = ({ isVisible }: { isVisible: boolean }) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['anime-special'],
    queryFn: async () => {
      const data = await getAnime({ limit: 10, page: 1 });
      return data;
    },
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
    <div className="relative z-20 text-white lg:-translate-y-40 md:-translate-y-20 overflow-hidden">
      <h2 className="text-2xl font-medium text-white  px-8 md:px-16 pb-4">
        Special for you
      </h2>

      <HorizontalCarousel error={error} refetch={refetch} isLoading={isLoading}>
        {isLoading || !isVisible || error ? skeletonNodes : posterCardNodes}
      </HorizontalCarousel>
    </div>
  );
};
export default SpecialForYouCard;
