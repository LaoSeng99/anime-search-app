import { useInfiniteQuery } from '@tanstack/react-query';
import AnimePosterCard from '../../components/AnimePosterCard';
import AnimeCardSkeleton from '../../components/AnimePosterCardSkeleton';
import LazyLoadSection from '../../components/ui/LazyLoadSection';
import { USE_INFINITY_STALE } from '../../types/app.constant';
import ErrorState from '../../components/ui/ErrorState';
import Button from '../../components/ui/Button';
import { useInView } from 'react-intersection-observer';
import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { getTopAnime } from '../../services/animeService';

const PopularCard = () => {
  return (
    <LazyLoadSection rootMargin="0px">
      {(inView) => <PopularContent isVisible={inView} />}
    </LazyLoadSection>
  );
};

const MAX_ITEMS = 50;
const ITEMS_PER_PAGE = 12; // 6 cols * 2 rows = 12

const PopularContent = ({ isVisible }: { isVisible: boolean }) => {
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['anime-popular'],
    queryFn: async ({ pageParam = 1 }) => {
      return await getTopAnime({ limit: ITEMS_PER_PAGE, page: pageParam });
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const currentTotal = allPages.flatMap((p) => p.data).length;

      if (currentTotal >= MAX_ITEMS) return undefined;

      const pagination = lastPage.pagination;
      if (pagination.has_next_page) {
        return pagination.current_page + 1;
      }
      return undefined;
    },
    enabled: isVisible,
    staleTime: USE_INFINITY_STALE,
    retry: 3,
    retryDelay: 2000,
  });
  const navigate = useNavigate();
  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: '50px',
  });

  const allAnime = useMemo(() => {
    if (!data) return [];
    const flattened = data.pages.flatMap((page) => page.data);

    const uniqueMap = new Map();
    flattened.forEach((item) => uniqueMap.set(item.mal_id, item));

    return Array.from(uniqueMap.values()).slice(0, MAX_ITEMS);
  }, [data]);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  const showViewMoreButton =
    allAnime.length >= MAX_ITEMS || (!hasNextPage && allAnime.length > 0);

  const skeletonNodes = [...Array(6)].map((_, i) => (
    <AnimeCardSkeleton key={i} />
  ));

  return (
    <div className="lg:-translate-y-40 md:-translate-y-20 relative z-20 text-white overflow-hidden">
      <h2 className="text-2xl font-medium text-white px-8 md:px-16 pb-4">
        Most Popular
      </h2>

      <div className="px-8 md:px-16">
        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 md:gap-6 w-full">
          {/* Error */}
          {error && (
            <div className="absolute h-full inset-0 z-30 flex items-center justify-center bg-black/70 backdrop-blur-[2px] rounded-lg ">
              <ErrorState
                title="Unable to load popular show"
                onRetry={() => refetch()}
              />
            </div>
          )}
          {/* Render Cards */}
          {allAnime.map((anime) => (
            <div key={anime.mal_id} className="relative w-full">
              <AnimePosterCard className="w-full" anime={anime} />
            </div>
          ))}
          {(isLoading || isFetchingNextPage) && !error && skeletonNodes}
        </div>

        {/* Infinity Scroll Sensor & View More Logic */}
        <div className="mt-8 flex justify-center w-full">
          {showViewMoreButton ? (
            <Button
              onClick={() => {
                navigate('/anime');
              }}>
              View More
            </Button>
          ) : (
            !isFetchingNextPage &&
            hasNextPage &&
            !error && <div ref={ref} className="h-4 w-full opacity-0" />
          )}
        </div>
      </div>
    </div>
  );
};

export default PopularCard;
