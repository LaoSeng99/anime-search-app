import { useMemo } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getTopAnime } from '../../../services/animeService';
import { USE_INFINITY_STALE } from '../../../types/app.constant';

export const usePopularCardLogic = ({ isVisible }: { isVisible: boolean }) => {
  const MAX_ITEMS = 50;
  const ITEMS_PER_PAGE = 12;

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['anime-popular'],
    queryFn: async ({ pageParam = 1 }) => {
      return await getTopAnime({ limit: ITEMS_PER_PAGE, page: pageParam });
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const currentTotal = allPages.flatMap((p) => p.data).length;

      if (currentTotal >= MAX_ITEMS) return undefined;

      const pagination = lastPage.pagination;
      if (pagination.has_next_page) {
        return pagination.current_page + 1;
      }
      return undefined;
    },
    enabled: isVisible,
    staleTime: USE_INFINITY_STALE,
  });

  const allAnime = useMemo(() => {
    if (!data) return [];
    const flattened = data.pages.flatMap((page) => page.data);

    const uniqueMap = new Map();
    flattened.forEach((item) => uniqueMap.set(item.mal_id, item));

    return Array.from(uniqueMap.values()).slice(0, MAX_ITEMS);
  }, [data]);

  return {
    MAX_ITEMS,
    ITEMS_PER_PAGE,
    allAnime,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    showViewMoreButton:
      allAnime.length >= MAX_ITEMS || (!hasNextPage && allAnime.length > 0),
  };
};
