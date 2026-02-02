import { create } from 'zustand';
import {
  deleteAllFavourites,
  getFavourites,
  saveFavourites,
} from '../services/favouriteService';
import type { Anime } from '../types/anime';

interface FavouriteState {
  favouriteIds: number[];
  favouriteAnime: Anime[];
  initialized: boolean;

  init: () => Promise<void>;
  toggleFavourite: (anime: Anime) => Promise<void>;
  removeAllFavourite: () => Promise<void>;
}

export const useFavouriteStore = create<FavouriteState>((set, get) => ({
  favouriteIds: [],
  favouriteAnime: [],
  initialized: false,

  init: async () => {
    if (get().initialized) return;

    const animeList = await getFavourites();
    set({
      favouriteIds: animeList.map((anime) => anime.mal_id),
      favouriteAnime: animeList,
      initialized: true,
    });
  },
  toggleFavourite: async (anime: Anime) => {
    const { favouriteIds, favouriteAnime } = get();

    const isFav = favouriteIds.includes(anime.mal_id);

    const newAnimeList = isFav
      ? favouriteAnime.filter((anime) => anime.mal_id !== anime.mal_id) // if remove from fav list
      : [...favouriteAnime, anime]; // if add to fav list

    const newIds = newAnimeList.map((anime) => anime.mal_id);

    //Update to UI
    set({ favouriteAnime: newAnimeList, favouriteIds: newIds });

    try {
      await saveFavourites(newAnimeList);
    } catch (err) {
      //roll back
      set({ favouriteIds });
      console.error('Failed to sync favourite status', err);
    }
  },

  removeAllFavourite: async () => {
    try {
      await deleteAllFavourites();
      set({ favouriteAnime: [], favouriteIds: [] });
    } catch (err) {
      console.error('Failed to remove all favourites');
    }
  },
}));
