import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router';
import AnimePosterCard, {
  AnimeCardSkeleton,
} from '../../../components/AnimePosterCard';
import Button from '../../../components/ui/Button';
import ErrorState from '../../../components/ui/ErrorState';
import LazyLoadSection from '../../../components/ui/LazyLoadSection';
import { usePopularCardLogic } from './PopularCard.hook';
import { cn } from '../../../utils/ui.util';
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
    isError,
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
    <div className={cn([' text-white overflow-hidden'])}>
      <h2 className="text-2xl font-medium text-white px-8 md:px-16 pb-4">
        Most Popular
      </h2>

      <div
        className={cn([
          'px-8 md:px-16',
          // for display error sate
          isError ? 'relative py-40' : '',
        ])}>
        {/* Grid */}
        <div
          className={cn([
            'grid grid-cols-1 gap-4 md:gap-6 w-full ',
            'grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6',
          ])}>
          {/* Error */}
          {isError ? (
            <div className="absolute h-full inset-0 z-30 flex items-center justify-center bg-black/70 backdrop-blur-[2px] rounded-lg ">
              <ErrorState
                className="my-12"
                title="Unable to load popular show"
                onRetry={() => refetch()}
              />
            </div>
          ) : //Render Cards
          isLoading || isFetchingNextPage ? (
            skeletonNodes
          ) : (
            allAnime.map((anime) => (
              <div className="relative w-full flex items-center justify-center">
                <AnimePosterCard
                  key={anime.mal_id}
                  className="w-full"
                  anime={anime}
                />
              </div>
            ))
          )}
        </div>

        {/* Infinity Scroll Sensor & View More Logic */}
        <div className="mt-8 flex justify-center w-full">
          {showViewMoreButton ? (
            <Button
              onClick={() => {
                navigate('/anime?order_by=popularity&sort=asc');
              }}>
              View More
            </Button>
          ) : (
            !isFetchingNextPage &&
            hasNextPage &&
            !isError && <div ref={ref} className="h-4 w-full opacity-0" />
          )}
        </div>
      </div>
    </div>
  );
};

export default PopularCard;
