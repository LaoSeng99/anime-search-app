import type {
  AnimeSearchQueryOrderBy,
  AnimeSearchQueryRating,
  AnimeSearchQueryStatus,
  AnimeSearchQueryType,
} from '../types/anime.request';

export const ANIME_TYPE_LABELS: Record<AnimeSearchQueryType, string> = {
  tv: 'TV Series',
  movie: 'Movie',
  ova: 'OVA',
  special: 'Special',
  ona: 'ONA',
  music: 'Music',
  cm: 'Commercial (CM)',
  pv: 'Promotional Video (PV)',
  tv_special: 'TV Special',
};

export const getAnimeTypeLabel = (
  type: string | AnimeSearchQueryType,
): string => {
  return ANIME_TYPE_LABELS[type.toLowerCase() as AnimeSearchQueryType] ?? 'N/A';
};

export const ORDER_BY_LABELS: Record<AnimeSearchQueryOrderBy, string> = {
  mal_id: 'ID',
  title: 'Title',
  start_date: 'Start Date',
  end_date: 'End Date',
  episodes: 'Episodes',
  score: 'Score',
  scored_by: 'Scored By',
  rank: 'Rank',
  popularity: 'Popularity',
  members: 'Members',
  favorites: 'Favorites',
};

export const getAnimeSorterLabel = (
  type: string | AnimeSearchQueryOrderBy,
): string => {
  return (
    ORDER_BY_LABELS[type.toLowerCase() as AnimeSearchQueryOrderBy] ?? 'N/A'
  );
};

export const RATING_LABEL: Record<AnimeSearchQueryRating, string> = {
  g: 'G - All Ages',
  pg: 'PG - Children',
  pg13: 'PG-13 - Teens 13 or older',
  r17: 'R - 17+ (violence & profanity)',
  r: 'R+ - Mild Nudity',
  rx: 'Rx - Hentai',
};

export const getAnimeRatingLabel = (
  rating: string | AnimeSearchQueryRating,
): string => {
  return RATING_LABEL[rating.toLowerCase() as AnimeSearchQueryRating] ?? 'N/A';
};

export const STATUS_LABEL: Record<AnimeSearchQueryStatus, string> = {
  airing: 'Airing',
  complete: 'Completed',
  upcoming: 'Upcoming',
};

export const getAnimeStatusLabel = (
  status: string | AnimeSearchQueryStatus,
): string => {
  return STATUS_LABEL[status.toLowerCase() as AnimeSearchQueryStatus] ?? 'N/A';
};

export const cleanSynopsis = (value: string | null): string | null => {
  return value?.replace(/\[Written by MAL Rewrite\]/g, '') ?? null;
};
