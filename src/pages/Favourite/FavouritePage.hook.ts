import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router';
import { useCheckboxGroup } from '../../hooks/useCheckboxGroup';
import { useFavouriteStore } from '../../hooks/useFavouriteStore';
import type { CheckboxOption, SortParams } from '../../types/ui.interface';
import { getAnimeSorterList, sortAnime } from '../../utils/anime.util';
import { getAnimeTypeLabel } from '../../utils/labelHelper';
import { useDebounce } from '../../hooks/useDebounce';

export const useFavouriteLogic = () => {
  const PER_PAGE = 12;
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  const { favouriteAnime, removeAllFavourite } = useFavouriteStore();
  // Filter logic
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

  const {
    options: filterOptions,
    toggleOption,
    reset: resetFilter,
  } = useCheckboxGroup(animeFilters);

  // get current active filters (support multi filter)
  const activeFilterSet = useMemo(() => {
    return new Set(
      filterOptions.filter((opt) => opt.checked).map((opt) => opt.id),
    );
  }, [filterOptions]);

  // Sorter
  const [sortParams, setSortParams] = useState<SortParams>({});
  const sorterList = useMemo(
    () => getAnimeSorterList(sortParams),
    [sortParams],
  );

  // Debounce
  const debouncedFilterSet = useDebounce(activeFilterSet, 300);
  const debouncedSortParams = useDebounce(sortParams, 300);

  // Process, Filter > Sorting
  const filteredAnime = useMemo(() => {
    const result =
      debouncedFilterSet.size === 0
        ? [...favouriteAnime]
        : favouriteAnime.filter((a) =>
            debouncedFilterSet.has(a.type?.toLowerCase()),
          );

    if (debouncedSortParams) {
      return sortAnime(result, debouncedSortParams);
    }
    return result;
  }, [favouriteAnime, debouncedFilterSet, debouncedSortParams]);

  // Pagination
  const displayAnime = useMemo(() => {
    const start = (currentPage - 1) * PER_PAGE;
    return filteredAnime.slice(start, start + PER_PAGE);
  }, [filteredAnime, currentPage]);

  const changePage = (page: number) => {
    setSearchParams({ page: page.toString() });
  };

  return {
    displayAnime,
    totalItems: filteredAnime.length,
    currentPage,
    filterOptions,
    sorterList,
    PER_PAGE,
    handleFilter: toggleOption,
    handleSorter: setSortParams,
    resetFilter,
    removeAllFavourite,

    hasFavourite: favouriteAnime.length > 0,
  };
};
