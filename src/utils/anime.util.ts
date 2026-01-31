import type { AnimeSearchQueryOrderBy } from '../types/anime.request';
import type { SorterItem, SortParams } from '../types/ui.interface';

const ORDER_BY_LABELS: Record<AnimeSearchQueryOrderBy, string> = {
  mal_id: 'ID',
  title: 'Title',
  start_date: 'Start Date',
  end_date: 'End Date',
  episodes: 'Episodes',
  score: 'Score',
  scored_by: 'Scored By',
  rank: 'Rank',
  popularity: 'Popularity',
  members: 'Members',
  favorites: 'Favorites',
};

export const getAnimeSorterList = (currentParams: SortParams): SorterItem[] => {
  const fields: AnimeSearchQueryOrderBy[] = Object.keys(
    ORDER_BY_LABELS,
  ) as AnimeSearchQueryOrderBy[];

  return fields.map((field) => {
    const isActive = currentParams.order_by === field;

    return {
      label: ORDER_BY_LABELS[field],
      isActive: isActive,
      currentSort: isActive ? currentParams.sort : undefined,
      sortBy: {
        order_by: field,
        // if is active, change direction; if not default to desc
        sort: isActive
          ? currentParams.sort === 'desc'
            ? 'asc'
            : 'desc'
          : 'desc',
      },
    };
  });
};
