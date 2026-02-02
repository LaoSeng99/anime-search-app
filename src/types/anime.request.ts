// --- Supporting Types ---

export type AnimeSearchQueryType =
  | 'tv'
  | 'movie'
  | 'ova'
  | 'special'
  | 'ona'
  | 'music'
  | 'cm'
  | 'pv'
  | 'tv_special';

export type AnimeSearchQueryStatus = 'airing' | 'complete' | 'upcoming';

export type AnimeSearchQueryRating = 'g' | 'pg' | 'pg13' | 'r17' | 'r' | 'rx';

export type AnimeSearchQueryOrderBy =
  | 'mal_id'
  | 'title'
  | 'start_date'
  | 'end_date'
  | 'episodes'
  | 'score'
  | 'scored_by'
  | 'rank'
  | 'popularity'
  | 'members'
  | 'favorites';

export type AnimeSeasonQueryFilter =
  | 'tv'
  | 'movie'
  | 'ova'
  | 'special'
  | 'ona'
  | 'music';

export const ANIME_MAXIMUM_LIMIT = 25;

export type TopAnimeFilter =
  | 'airing'
  | 'upcoming'
  | 'bypopularity'
  | 'favorite';
