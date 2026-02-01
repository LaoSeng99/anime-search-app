import { del, get, set } from 'idb-keyval';
import type { Anime } from '../types/anime';

const STORAGE_KEY = 'favourite-storage';

//Depend on AnimePosterCard
const simplifyAnime = (anime: Anime) => ({
  mal_id: anime.mal_id,
  title: anime.title,
  images: {
    webp: {
      image_url: anime.images.webp.image_url,
    },
  },
  year: anime.year,
  genres: anime.genres,
  synopsis: anime.synopsis,
  type: anime.type,
  /* order_by value */
  episodes: anime.episodes,
  rating: anime.rating,
  score: anime.score,
  scored_by: anime.scored_by,
  rank: anime.rank,
  popularity: anime.popularity,
  members: anime.members,
  favorites: anime.favorites,
  aired: anime.aired,
});

export const getFavourites = async (): Promise<Anime[]> => {
  try {
    const data = await get<Anime[]>(STORAGE_KEY);
    return data || [];
  } catch (error) {
    console.error('Storage Error:', error);
    return [];
  }
};

export const saveFavourites = async (animeList: Anime[]): Promise<void> => {
  const data = animeList.map(simplifyAnime);
  await set(STORAGE_KEY, data);
};

export const deleteAllFavourites = async (): Promise<void> => {
  await del(STORAGE_KEY);
};
