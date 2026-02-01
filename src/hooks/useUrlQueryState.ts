import { useMemo } from 'react';
import { useSearchParams } from 'react-router';
import type { GetAnimeSearchRequest } from '../services/animeService';
import type {
  AnimeSearchQueryType,
  AnimeSearchQueryStatus,
  AnimeSearchQueryRating,
  AnimeSearchQueryOrderBy,
} from '../types/anime.request';
import { ORDER_BY_LABELS } from '../utils/anime.util';
import type { ActiveFilterItem } from '../types/ui.interface';

export const useUrlQueryState = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const urlRequest = useMemo((): GetAnimeSearchRequest => {
    const getNum = (key: string) => {
      const val = searchParams.get(key);
      return val ? Number(val) : undefined;
    };

    return {
      page: getNum('page') || 1,
      limit: getNum('pp') || 12,
      q: searchParams.get('q') || undefined,
      type: (searchParams.get('type') as AnimeSearchQueryType) || undefined,
      score: getNum('score'),
      min_score: getNum('min_score'),
      max_score: getNum('max_score'),
      status:
        (searchParams.get('status') as AnimeSearchQueryStatus) || undefined,
      rating:
        (searchParams.get('rating') as AnimeSearchQueryRating) || undefined,
      genres: searchParams.get('genres') || undefined,
      genres_exclude: searchParams.get('genres_exclude') || undefined,
      order_by:
        (searchParams.get('order_by') as AnimeSearchQueryOrderBy) || undefined,
      sort: (searchParams.get('sort') as 'desc' | 'asc') || undefined,
      letter: searchParams.get('letter') || undefined,
      producers: searchParams.get('producers') || undefined,
      start_date: searchParams.get('start_date') || undefined,
      end_date: searchParams.get('end_date') || undefined,
    };
  }, [searchParams]);

  const updateUrl = (
    params: { key: string; value: string | number | undefined | null }[],
  ) => {
    const newParams = new URLSearchParams(searchParams);

    params.forEach(({ key, value }) => {
      if (!key.trim()) return;

      // remove if value not set (not filtering)
      if (value === '' || value === undefined || value === null) {
        newParams.delete(key);
      } else {
        newParams.set(key, String(value));
      }
    });

    const hasFilterChanged = params.some(({ key }) => {
      if (key === 'page') return false; // page change not included
      return newParams.get(key) !== searchParams.get(key); //new value compare with old value
    });

    // only change when filter change
    // and currently not in page 1
    // if already in page 1, not need to set page 1
    if (
      hasFilterChanged &&
      searchParams.get('page') !== '1' &&
      searchParams.has('page')
    ) {
      newParams.set('page', '1');
    }

    if (newParams.toString() !== searchParams.toString()) {
      setSearchParams(newParams);
    }
  };

  const setSingleParam = (key: string, value: string | number | undefined) => {
    updateUrl([{ key, value }]);
  };

  const activeFilters = useMemo((): ActiveFilterItem[] => {
    return Object.entries(urlRequest)
      .filter(([key, value]) => {
        if (key === 'page' || key === 'limit') return false;
        return !!value;
      })
      .map(([key, value]) => {
        let displayKey = String(key);

        let displayValue = String(value);

        if (key === 'order_by') {
          displayValue = ORDER_BY_LABELS[value as AnimeSearchQueryOrderBy];
        } else if (key === 'sort') {
          displayValue = value === 'desc' ? 'Descending' : 'Ascending';
        } else if (key === 'q') {
          displayKey = 'Search';
        }

        return {
          key,
          label: displayKey.replace('_', ' '),
          value: displayValue,
        };
      });
  }, [urlRequest]);

  return { urlRequest, updateUrl, setSingleParam, searchParams, activeFilters };
};
