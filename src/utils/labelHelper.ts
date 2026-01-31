import type { AnimeSearchQueryType } from '../types/anime.request';

const AnimeTypeLabelMap: Record<string, string> = {
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
  return AnimeTypeLabelMap[type.toLowerCase()] ?? 'N/A';
};
