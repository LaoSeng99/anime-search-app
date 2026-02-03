import PaginationGroup from '../../components/ui/PaginationGroup';
import { useMemo } from 'react';
import AnimePosterCard from '../../components/AnimePosterCard';
import { useDialog } from '../../hooks/useDialog';
import BackgroundSection from '../../components/layout/BackgroundSection';

import { useFavouriteLogic } from './FavouritePage.hook';
import FavouriteToolbar from './FavouriteToolbar';
import { Heart } from 'lucide-react';
import EmptyState from '../../components/ui/EmptyState';
import { cn } from '../../utils/ui.util';

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
  } = useFavouriteLogic();

  const { confirm } = useDialog();

  const currentBackgroundUrl = useMemo(() => {
    return displayAnime[0]?.images?.webp?.image_url ?? '';
  }, [displayAnime]);

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
      <section
        className={cn([
          'relative z-20 h-full min-w-full flex flex-col items-center',
          'pt-18',
        ])}>
        <h1
          className={cn([
            'text-white  font-extrabold tracking-tight drop-shadow-xl self-start   w-full h-full',
            'text-3xl sm:text-4xl md:text-5xl lg:text-6xl',
            'px-8 md:px-16',
            'py-8 pb-0 lg:pb-8',
            ' bg-black/80 lg:bg-transparent',
          ])}>
          Anime Catalog
        </h1>

        <div className="w-full  bg-black/80 px-8 py-8 min-h-150 flex flex-col justify-between">
          {/* Action Group */}
          <FavouriteToolbar
            isLoading={false}
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
              <div
                key={anime.mal_id}
                className="relative w-full flex items-center justify-center ">
                <AnimePosterCard className="w-full" anime={anime} />
              </div>
            ))}
          </div>

          {/* Empty handle */}
          {displayAnime.length === 0 && (
            <EmptyState icon={Heart} message="No favourite anime found." />
          )}

          {/* Pagination */}
          <div className="mt-12">
            <PaginationGroup
              perPage={PER_PAGE}
              itemLength={totalItems}
              currentPage={currentPage}
              isLoading={false}
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

export default FavouritePage;
