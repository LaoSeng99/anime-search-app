import type { Anime } from '../types/anime';
import type { AnimeSearchQueryOrderBy } from '../types/anime.request';
import type { SorterItem, SortParams } from '../types/ui.interface';

export const ORDER_BY_LABELS: Record<AnimeSearchQueryOrderBy, string> = {
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

/**
 * Sorts and return new array of Anime objects locally based on AnimeSearchQueryOrderBy. (only support sorting 1 value)
 */
export const sortAnime = (data: Anime[], params: SortParams): Anime[] => {
  const { order_by, sort } = params;
  if (!order_by) return data;

  // map flat UI keys to nested object path in the data structure
  const fieldMapping: Record<string, string> = {
    start_date: 'aired.from',
    end_date: 'aired.to',
  };

  const actualPath = fieldMapping[order_by] || order_by;

  return [...data].sort((a, b) => {
    let valA = getValueByPath(a, actualPath);
    let valB = getValueByPath(b, actualPath);

    // null value always at last place in array
    if (valA == null) return 1;
    if (valB == null) return -1;

    // Value normalization
    // convert date to timestamps to ensure reliable numeric comparison
    if (valA instanceof Date) valA = valA.getTime();
    if (valB instanceof Date) valB = valB.getTime();

    //date string
    if (typeof valA === 'string' && !isNaN(Date.parse(valA))) {
      valA = new Date(valA).getTime();
      valB = new Date(valB).getTime();
    }

    // second check for normalized values
    if (valA == null) return 1;
    if (valB == null) return -1;

    const res = valA > valB ? 1 : valA < valB ? -1 : 0;
    return sort === 'desc' ? -res : res;
  });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getValueByPath = (obj: any, path: string) => {
  return path.split('.').reduce((acc, key) => acc?.[key], obj);
};
