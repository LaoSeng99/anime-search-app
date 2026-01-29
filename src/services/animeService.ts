import type { Anime } from '../types/anime';
import type { ApiListResponse } from '../types/api.response';
import apiClient from './apiClient';

const ANIME_MAXIMUM_LIMIT = 25;

export const getAnime = async (
  limit: number = 10,
  page: number = 1,
  query: string = '',
) => {
  if (limit > ANIME_MAXIMUM_LIMIT) {
    throw new Error('Limit cannot exceed 25');
  }

  const response = await apiClient.get<ApiListResponse<Anime>>('/anime', {
    params: {
      limit: limit,
      page: page,
      q: query,
    },
  });

  return response.data;
};
