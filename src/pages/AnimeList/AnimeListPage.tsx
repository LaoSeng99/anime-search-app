import { useInfiniteQuery, type InfiniteData } from '@tanstack/react-query';
import { useState } from 'react';
import { getAnime } from '../../services/animeService';
import type { Anime } from '../../types/anime';
import type { ApiListResponse } from '../../types/api.response';
import { useInView } from 'react-intersection-observer';
import { useAnimeSearch } from '../../hooks/useAnimeSearch';

const AnimeListPage = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    searchQuery,
    setSearchQuery,
  } = useAnimeSearch(10);

  const { ref, inView } = useInView();

  return (
    <div className="pt-24 px-8">
      <h1>Anime List Page</h1>
    </div>
  );
};

export default AnimeListPage;
