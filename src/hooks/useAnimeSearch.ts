import { useInfiniteQuery, type InfiniteData } from '@tanstack/react-query';
import { getAnime } from '../services/animeService';
import type { Anime } from '../types/anime';
import type { ApiListResponse } from '../types/api.response';
import { useState } from 'react';

export const useAnimeSearch = (limit: number = 10) => {
  const [pageLimit, setPageLimit] = useState(limit);
  const [searchQuery, setSearchQuery] = useState('');

  const queryInfo = useInfiniteQuery<
    ApiListResponse<Anime>,
    Error,
    InfiniteData<ApiListResponse<Anime>>,
    [string, string],
    number
  >({
    queryKey: ['anime', searchQuery],
    queryFn: async ({ pageParam }) => {
      const data = await getAnime({ limit, page: pageParam, q: searchQuery });
      return data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const pagination = lastPage.pagination;
      if (pagination.has_next_page) {
        return pagination.current_page + 1;
      }
      return undefined;
    },
  });

  return {
    ...queryInfo,
    searchQuery,
    setSearchQuery,
    pageLimit,
    setPageLimit,
  };
};
