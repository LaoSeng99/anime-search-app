import type {
  AnimeSearchQueryOrderBy,
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
