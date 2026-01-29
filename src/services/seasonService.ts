import type { Anime } from '../types/anime';
import {
  ANIME_MAXIMUM_LIMIT,
  type AnimeSeasonQueryFilter,
} from '../types/anime.request';
import type { ApiListResponse } from '../types/api.response';
import apiClient from './apiClient';

export const getAnime = async (
  req: GetSeasonRequest = {
    limit: 10,
    page: 1,
  },
) => {
  if (req.limit! > ANIME_MAXIMUM_LIMIT) {
    throw new Error('Limit cannot exceed 25');
  }

  const response = await apiClient.get<ApiListResponse<Anime>>('/season/now', {
    params: { ...req },
  });

  return response.data;
};

export interface GetSeasonRequest {
  limit?: number;
  page?: number;
  filter?: AnimeSeasonQueryFilter;
}
