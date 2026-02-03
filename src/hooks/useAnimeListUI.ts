import { useContext } from 'react';
import AnimeListUIContext from '../context/AnimeListContext';

export const useAnimeListUI = () => {
  const context = useContext(AnimeListUIContext);
  if (!context) throw new Error('useAnimeListUI must be used within Provider');
  return context;
};
