import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router';
import type { GetAnimeSearchRequest } from '../services/animeService';
import type {
  AnimeSearchQueryType,
  AnimeSearchQueryStatus,
  AnimeSearchQueryRating,
  AnimeSearchQueryOrderBy,
} from '../types/anime.request';
import type { ActiveFilterItem } from '../types/ui.interface';
import {
  ANIME_TYPE_LABELS,
  ORDER_BY_LABELS,
  RATING_LABEL,
  STATUS_LABEL,
} from '../utils/labelHelper';

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

  const updateUrl = useCallback(
    (params: { key: string; value: string | number | undefined | null }[]) => {
      setSearchParams(
        //prev is realtime, the latest value
        (prev) => {
          const next = new URLSearchParams(prev);

          params.forEach(({ key, value }) => {
            if (!key.trim()) return;

            // remove if value not set (not filtering)
            if (value === '' || value === undefined || value === null) {
              next.delete(key);
            } else {
              next.set(key, String(value));
            }
          });

          const hasFilterChanged = params.some(({ key }) => {
            if (key === 'page') return false; // page change not included
            return next.get(key) !== prev.get(key); //new value compare with old value
          });

          // only change when filter change
          // and currently not in page 1
          // if already in page 1, not need to set page 1
          if (
            hasFilterChanged &&
            prev.get('page') !== '1' &&
            prev.has('page')
          ) {
            next.set('page', '1');
          }

          if (next.toString() === prev.toString()) {
            return prev;
          }

          return next;
        },
        { replace: true },
      );
    },
    [setSearchParams],
  );

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
        } else if (key === 'type') {
          displayValue = ANIME_TYPE_LABELS[value as AnimeSearchQueryType];
        } else if (key === 'rating') {
          displayValue = RATING_LABEL[value as AnimeSearchQueryRating];
        } else if (key === 'status') {
          displayValue = STATUS_LABEL[value as AnimeSearchQueryStatus];
        }

        return {
          key,
          label: displayKey.replace('_', ' '),
          value: displayValue,
        };
      });
  }, [urlRequest]);

  return {
    urlRequest,
    updateUrl,
    setSingleParam,
    searchParams,
    activeFilters,
  };
};
