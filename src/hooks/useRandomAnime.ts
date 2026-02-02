import { useQuery } from '@tanstack/react-query';
import { getSeasonNow } from '../services/seasonService';
import { useState } from 'react';

export const useRandomAnime = () => {
  // Just for trigger tanstack query select from cache again
  const [seed, setSeed] = useState(0);

  const {
    data: selected,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['anime-random'],
    queryFn: async () => {
      const result = await getSeasonNow({ page: 1, limit: 25, filter: 'tv' });
      const data = result.data;
      return data;
    },
    select: (data) => {
      if (!data || data.length === 0) return null;

      const highScored = data.filter((a) => (a.score ?? 0) > 7.5);
      const targetList = highScored.length > 0 ? highScored : data;

      const index = Math.floor(Math.random() * targetList.length);
      return targetList[index];
    },
    staleTime: Infinity,
  });

  const rePick = () => {
    setSeed((prev) => prev + 1);
  };

  const handleRefetch = async () => {
    await refetch();
    rePick();
  };

  return {
    selected,
    rePick,
    isLoading,
    isError,
    handleRefetch,
  };
};
