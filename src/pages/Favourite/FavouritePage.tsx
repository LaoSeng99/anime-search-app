import PaginationGroup from '../../components/ui/PaginationGroup';
import { useMemo, useState } from 'react';
import AnimePosterCard from '../../components/AnimePosterCard';
import { useDialog } from '../../hooks/useDialog';
import BackgroundSection from '../../components/layout/BackgroundSection';

import { useFavouriteLogic } from './FavouritePage.hook';
import FavouriteToolbar from './FavouriteToolbar';

const FavouritePage = () => {
  const {
    displayAnime,
    totalItems,
    currentPage,
    filterOptions,
    sorterList,
    PER_PAGE,
    handleFilter,
    handleSorter,
    resetFilter,
    removeAllFavourite,
    hasFavourite,
  } = useFavouriteLogic();

  const { confirm } = useDialog();

  const currentBackgroundUrl = useMemo(() => {
    return displayAnime[0]?.images?.webp?.image_url ?? '';
  }, [displayAnime]);

  const [isLoading, setIsLoading] = useState(false);

  const handleRemoveAllFavourite = () => {
    confirm(
      'Remove All Favourites?',
      'This will clear your entire list. This action cannot be undone.',
      async () => {
        await removeAllFavourite();
      },
      {
        isDanger: true,
      },
    );
  };

  return (
    <div className="relative w-full overflow-hidden">
      <BackgroundSection
        currentImageUrl={currentBackgroundUrl}></BackgroundSection>

      <div className="absolute inset-0 z-10 backdrop-blur-sm bg-black/40" />
      {/* Content */}
      <section className="relative z-20 h-full min-w-full flex flex-col items-center pt-48">
        <h1 className="text-white text-4xl md:text-6xl font-extrabold tracking-tight drop-shadow-xl self-start px-8 md:px-16 mb-8">
          Favourite Anime
        </h1>

        <div className="w-full bg-black/80 px-8 py-12 min-h-150">
          {/* Action Group */}
          <FavouriteToolbar
            isLoading={isLoading}
            totalItems={totalItems}
            filterOptions={filterOptions}
            onFilter={handleFilter}
            onFilterReset={resetFilter}
            sorters={sorterList}
            onSorting={handleSorter}
            onSortingReset={() => handleSorter({})}
            onRemoveAllFavourite={handleRemoveAllFavourite}></FavouriteToolbar>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 md:gap-6 w-full mt-8">
            {displayAnime.map((anime) => (
              <div key={anime.mal_id} className="relative w-full">
                <AnimePosterCard className="w-full" anime={anime} />
              </div>
            ))}
          </div>

          {/* Empty handle */}
          {displayAnime.length === 0 && EmptyState()}

          {/* Pagination */}
          <div className="mt-12">
            <PaginationGroup
              perPage={PER_PAGE}
              itemLength={totalItems}
              currentPage={currentPage}
              isLoading={isLoading}
              onChangePage={() => {
                // Already handle by in filteredAnime
              }}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

const EmptyState = () => (
  <div className="text-gray-500 text-center py-20">
    No anime found in this category.
  </div>
);

export default FavouritePage;
