import PaginationGroup from '../components/ui/PaginationGroup';
import { useSearchParams } from 'react-router';
import { useFavouriteStore } from '../hooks/useFavouriteStore';
import FilterButton from '../components/ui/FilterButton';
import { useMemo, useState } from 'react';
import { useCheckboxGroup } from '../hooks/useCheckboxGroup';
import AnimePosterCard from '../components/AnimePosterCard';
import Button from '../components/ui/Button';
import { HeartCrack } from 'lucide-react';
import { useDialog } from '../hooks/useDialog';
import type { CheckboxOption } from '../types/ui.interface';
import { getAnimeTypeLabel } from '../utils/labelHelper';
import BackgroundSection from '../components/layout/BackgroundSection';
const FavouritePage = () => {
  const PER_PAGE = 12;
  const [searchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  const { favouriteAnime, removeAllFavourite } = useFavouriteStore();
  const { confirm } = useDialog();
  console.log(favouriteAnime);

  const animeFilters: CheckboxOption[] = useMemo(() => {
    const types = Array.from(
      new Set(favouriteAnime.map((a) => a.type.toLowerCase())),
    );
    return types.map((type) => ({
      id: type,
      label: getAnimeTypeLabel(type),
      checked: false,
    }));
  }, [favouriteAnime]);

  const { options, toggleOption, reset } = useCheckboxGroup(animeFilters);

  // get current active filters (support multi filter)
  const activeFilterSet = useMemo(() => {
    return new Set(options.filter((opt) => opt.checked).map((opt) => opt.id));
  }, [options]);

  // Copy of filtered anime
  const filteredAnime = useMemo(() => {
    if (activeFilterSet.size === 0) return favouriteAnime;

    return favouriteAnime.filter((anime) =>
      activeFilterSet.has(anime.type?.toLowerCase()),
    );
  }, [favouriteAnime, activeFilterSet]);

  // displaying
  const displayAnime = useMemo(() => {
    const start = (currentPage - 1) * PER_PAGE;
    const end = start + PER_PAGE;
    return filteredAnime.slice(start, end);
  }, [filteredAnime, currentPage]);

  const currentBackgroundUrl = useMemo(() => {
    return displayAnime[0]?.images?.webp?.image_url ?? '';
  }, [displayAnime]);

  const [isLoading, setIsLoading] = useState(false);

  const handleChangePage = (page: number) => {};
  const handleFilter = (id: string) => {
    toggleOption(id);
  };

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
          <div className="flex gap-6">
            <FilterButton
              title="Anime Type"
              filters={options}
              isLoading={isLoading}
              onFilter={handleFilter}
              onReset={reset}
            />

            <Button
              leftIcon={<HeartCrack />}
              variant="danger"
              onClick={handleRemoveAllFavourite}
              disabled={favouriteAnime.length === 0}>
              Remove all favourites
            </Button>
          </div>

          {/* Grid 展示 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 md:gap-6 w-full mt-8">
            {displayAnime.map((anime) => (
              <div key={anime.mal_id} className="relative w-full">
                <AnimePosterCard className="w-full" anime={anime} />
              </div>
            ))}
          </div>

          {/* Empty handle */}
          {displayAnime.length === 0 && (
            <div className="text-gray-500 text-center py-20">
              No anime found in this category.
            </div>
          )}

          {/* Pagination */}
          <div className="mt-12">
            <PaginationGroup
              perPage={PER_PAGE}
              itemLength={filteredAnime.length}
              currentPage={currentPage}
              isLoading={isLoading}
              onChangePage={handleChangePage}
            />
          </div>
        </div>
      </section>
      {/* {' '}
       */}
    </div>
  );
};

export default FavouritePage;
