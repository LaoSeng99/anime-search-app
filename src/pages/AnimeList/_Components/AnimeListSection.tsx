import { useRef, useEffect } from 'react';
import { useDebounce } from 'use-debounce';
import AnimePosterCard, {
  AnimeCardSkeleton,
} from '../../../components/AnimePosterCard';
import PaginationGroup from '../../../components/ui/PaginationGroup';
import { useAnimeSearch } from '../../../hooks/useAnimeSearch';
import { useUrlQueryState } from '../../../hooks/useUrlQueryState';
import { cn } from '../../../utils/ui.util';
import AnimeListSidebar from './AnimeListSidebar';
import AnimeListToolbar from './AnimeListToolbar';
import { useAnimeListUI } from '../../../hooks/useAnimeListUI';
import { Search } from 'lucide-react';
import EmptyState from '../../../components/ui/EmptyState';
import ErrorState from '../../../components/ui/ErrorState';

const AnimeListSection = ({
  onChange,
}: {
  onChange: (url: string) => void;
}) => {
  const topRef = useRef<HTMLDivElement>(null);

  const { urlRequest, activeFilters, setSingleParam } = useUrlQueryState();
  const { isMobileFilterOpen } = useAnimeListUI();

  const [debouncedRequest] = useDebounce(urlRequest, 500);

  const { animeList, pagination, isLoading, isFetching, isError } =
    useAnimeSearch({
      req: debouncedRequest,
    });

  const isDataUpdating =
    urlRequest.page !== debouncedRequest.page || isFetching;
  const showSkeleton = isLoading || isDataUpdating;

  useEffect(() => {
    const url = animeList[0]?.images?.webp?.image_url ?? '';
    onChange(url);
  }, [animeList, onChange]);

  useEffect(() => {
    if (!urlRequest.page || !pagination?.last_visible_page) return;

    if (urlRequest.page > pagination?.last_visible_page) {
      setSingleParam('page', pagination?.last_visible_page);
    }
  }, [pagination?.last_visible_page, setSingleParam, urlRequest.page]);

  const skeletonNodes = [...Array(12)].map((_, i) => (
    <div
      key={`${i}`}
      className="relative w-full flex items-center justify-center ">
      <AnimeCardSkeleton key={i} className="w-full " />
    </div>
  ));

  return (
    <div
      className="flex justify-between w-full bg-black/80 pb-0 min-h-150 scroll-mt-18"
      ref={topRef}>
      <AnimeListSidebar />

      <main
        className={cn([
          'flex flex-col flex-1 pt-8 px-6 w-full h-full',
          isMobileFilterOpen ? 'h-screen' : '',
        ])}>
        <AnimeListToolbar isFetching={false}></AnimeListToolbar>
        {activeFilters.length > 0 && (
          <div className="md:mt-8 flex flex-wrap items-center gap-2">
            <span className="text-md text-gray-400 mr-2">Filtering:</span>
            {activeFilters.map((filter) => (
              <div
                key={filter.key}
                className="flex items-center bg-white/10 border border-white/20 px-3 py-1 rounded-full text-xs text-gray-200 transition-hover hover:border-white/40">
                <span className="capitalize text-gray-400">
                  {filter.label}:
                </span>
                <span className="ml-1 font-semibold">{filter.value}</span>
              </div>
            ))}
          </div>
        )}
        {/* Grid */}
        {isError ? (
          <ErrorState />
        ) : (
          !isLoading &&
          !showSkeleton &&
          animeList.length === 0 && (
            <EmptyState message="No anime found." icon={Search} />
          )
        )}

        <div className="flex-1 mt-6 flex items-center justify-center lg:justify-start">
          <div
            className={cn([
              'grid grid-cols-1 gap-4 md:gap-6 w-full ',
              'grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6',
            ])}>
            {!isError && showSkeleton
              ? // show skeleton first
                skeletonNodes
              : animeList.length > 0 &&
                animeList.map((anime, index) => (
                  <div
                    key={`${anime.mal_id}-${index}`}
                    className="relative w-full flex items-center justify-center ">
                    <AnimePosterCard className="w-full" anime={anime} />
                  </div>
                ))}
          </div>
        </div>
        <div className="mt-12 mb-8">
          <PaginationGroup
            totalPage={pagination?.last_visible_page}
            currentPage={urlRequest.page || 1}
            perPage={urlRequest.limit || 12}
            isLoading={isLoading || isFetching}
          />
        </div>
      </main>
    </div>
  );
};

export default AnimeListSection;
