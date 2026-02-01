import { useMemo, useRef } from 'react';
import { useAnimeSearch } from '../../hooks/useAnimeSearch';
import AnimePosterCard from '../../components/AnimePosterCard';
import PaginationGroup from '../../components/ui/PaginationGroup';
import AnimeListSidebar from './_Components/AnimeListSidebar';
import BackgroundSection from '../../components/layout/BackgroundSection';
import AnimeCardSkeleton from '../../components/AnimePosterCardSkeleton';

import { useUrlQueryState } from '../../hooks/useUrlQueryState';
import AnimeListToolbar from './_Components/AnimeListToolbar';
import { useDebounce } from 'use-debounce';

const AnimeListPage = () => {
  const topRef = useRef<HTMLDivElement>(null);

  const { urlRequest, activeFilters } = useUrlQueryState();

  const [debouncedRequest] = useDebounce(urlRequest, 500);

  const { animeList, pagination, isLoading, isFetching } = useAnimeSearch({
    req: debouncedRequest,
  });

  const isDataUpdating =
    urlRequest.page !== debouncedRequest.page || isFetching;
  const showSkeleton = isLoading || isDataUpdating;

  const currentBackgroundUrl = useMemo(() => {
    return animeList[0]?.images?.webp?.image_url ?? '';
  }, [animeList]);

  const skeletonNodes = [...Array(12)].map((_, i) => (
    <div className="relative w-full" key={i}>
      <AnimeCardSkeleton key={i} className="w-full" />
    </div>
  ));

  return (
    <div className="relative w-full overflow-hidden">
      <BackgroundSection
        currentImageUrl={currentBackgroundUrl}></BackgroundSection>
      <div className="absolute inset-0 z-10 backdrop-blur-sm bg-black/10" />

      <section className="relative z-20 h-full min-w-full flex flex-col items-center pt-48">
        <h1 className="text-white text-4xl md:text-6xl font-extrabold tracking-tight drop-shadow-xl self-start px-8 md:px-16 mb-8">
          Anime Catalog
        </h1>

        <div
          className="flex justify-between w-full bg-black/80 px-8 pl-0 pb-0 min-h-150 scroll-mt-18"
          ref={topRef}>
          <AnimeListSidebar />

          <main className=" flex flex-col flex-1 pt-8 px-6 w-full max-w-496 h-full">
            <AnimeListToolbar isFetching={false}></AnimeListToolbar>
            {activeFilters.length > 0 && (
              <div className="mt-6 flex flex-wrap items-center gap-2">
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
            <div className="flex-1">
              <div className="grid-1 h-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 mt-8">
                {showSkeleton
                  ? // show skeleton first
                    skeletonNodes
                  : animeList.length > 0 // show data
                    ? animeList.map((anime, index) => (
                        <div
                          key={`${anime.mal_id}-${index}`}
                          className="relative w-full">
                          <AnimePosterCard className="w-full" anime={anime} />
                        </div>
                      ))
                    : !isLoading && <EmptyState />}
              </div>
            </div>
            <div className="mt-12 mb-8">
              <PaginationGroup
                itemLength={pagination?.items?.total ?? 0}
                currentPage={urlRequest.page || 1}
                perPage={urlRequest.limit || 12}
                isLoading={isLoading || isFetching}
                onChangePage={() => {}}
              />
            </div>
          </main>
        </div>
      </section>
    </div>
  );
};

const EmptyState = () => (
  <div className="text-gray-500 text-center py-20 min-h-60">
    No anime found in this category.
  </div>
);
export default AnimeListPage;
