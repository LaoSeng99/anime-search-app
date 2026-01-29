import type { Anime } from '../types/anime';
import {
  type AnimeSearchQueryType,
  type AnimeSearchQueryStatus,
  type AnimeSearchQueryRating,
  type AnimeSearchQueryOrderBy,
  ANIME_MAXIMUM_LIMIT,
} from '../types/anime.request';
import type { ApiListResponse } from '../types/api.response';
import apiClient from './apiClient';

export const getAnime = async (
  req: GetAnimeSearchRequest = {
    limit: 10,
    page: 1,
    q: '',
  },
) => {
  if (req.limit! > ANIME_MAXIMUM_LIMIT) {
    throw new Error('Limit cannot exceed 25');
  }

  const response = await apiClient.get<ApiListResponse<Anime>>('/anime', {
    params: { ...req },
  });

  return response.data;
};

export interface GetAnimeSearchRequest {
  /** Current page number for pagination. */
  page?: number;

  /** Number of results per page. */
  limit?: number;

  /** Search query string. */
  q?: string;

  /** Filter by anime type. */
  type?: AnimeSearchQueryType;

  /** Filter by specific score. */
  score?: number;

  /** Filter by minimum score. */
  min_score?: number;

  /** Filter by maximum score. */
  max_score?: number;

  /** Filter by airing status. */
  status?: AnimeSearchQueryStatus;

  /** Filter by audience rating. */
  rating?: AnimeSearchQueryRating;

  /** * Filter by genre IDs.
   * Can pass multiple IDs separated by a comma (e.g., "1,2,3").
   */
  genres?: string;

  /** * Exclude specific genre IDs.
   * Can pass multiple IDs separated by a comma.
   */
  genres_exclude?: string;

  /** Property to order the results by. */
  order_by?: AnimeSearchQueryOrderBy;

  /** Sort direction (Ascending or Descending). */
  sort?: 'desc' | 'asc';

  /** Return entries starting with the given letter. */
  letter?: string;

  /** * Filter by producer IDs.
   * Can pass multiple IDs separated by a comma.
   */
  producers?: string;

  /** * Filter by starting date.
   * Format: YYYY-MM-DD (e.g., "2022", "2005-01-01").
   */
  start_date?: string;

  /** * Filter by ending date.
   * Format: YYYY-MM-DD.
   */
  end_date?: string;
}
