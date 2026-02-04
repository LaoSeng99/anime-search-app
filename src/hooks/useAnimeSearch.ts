import { useQuery } from '@tanstack/react-query';
import { getAnime, type GetAnimeSearchRequest } from '../services/animeService';

import { USE_INFINITY_STALE } from '../types/app.constant';

export const useAnimeSearch = ({ req }: { req: GetAnimeSearchRequest }) => {
  const { data, isLoading, isError, isFetching, refetch } = useQuery({
    queryKey: ['anime', 'search', req],
    queryFn: async () => {
      const response = await getAnime(req);
      return response;
    },
    staleTime: USE_INFINITY_STALE,
    placeholderData: (previousData) => previousData,
  });

  return {
    animeList: data?.data ?? [],
    pagination: data?.pagination,
    isLoading,
    isError,
    isFetching,
    refetch: refetch,
  };
};
