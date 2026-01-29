import { useInfiniteQuery, type InfiniteData } from '@tanstack/react-query';
import { useState } from 'react';
import { getAnime } from '../services/animeService';
import type { Anime } from '../types/anime';
import type { ApiListResponse } from '../types/api.response';

const AnimeListPage = () => {
  const [pageLimit, setPageLimit] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');

  const { data, error, fetchNextPage, hasNextPage } = useInfiniteQuery<
    ApiListResponse<Anime>,
    Error,
    InfiniteData<ApiListResponse<Anime>>,
    [string, string],
    number
  >({
    queryKey: ['anime', searchQuery],
    queryFn: async ({ pageParam }) => {
      const data = await getAnime(pageLimit, pageParam, searchQuery);

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

  return (
    <div>
      <h1>Anime List Page</h1>
    </div>
  );
};

export default AnimeListPage;
