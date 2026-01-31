import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router';
import AnimePosterCard from '../../../components/AnimePosterCard';
import AnimeCardSkeleton from '../../../components/AnimePosterCardSkeleton';
import Button from '../../../components/ui/Button';
import ErrorState from '../../../components/ui/ErrorState';
import LazyLoadSection from '../../../components/ui/LazyLoadSection';
import { usePopularCardLogic } from './PopularCard.hook';
const PopularCard = () => {
  return (
    <LazyLoadSection rootMargin="0px">
      {(inView) => <PopularContent isVisible={inView} />}
    </LazyLoadSection>
  );
};

const PopularContent = ({ isVisible }: { isVisible: boolean }) => {
  const navigate = useNavigate();

  const {
    allAnime,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    showViewMoreButton,
  } = usePopularCardLogic({ isVisible });

  //For infinite load trigger
  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: '50px',
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  const skeletonNodes = [...Array(6)].map((_, i) => (
    <AnimeCardSkeleton key={i} className="w-full" />
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
