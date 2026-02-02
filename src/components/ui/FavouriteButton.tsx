import { Heart } from 'lucide-react';
import { useFavouriteStore } from '../../hooks/useFavouriteStore';
import Button from './Button';
import type { Anime } from '../../types/anime';

const FavouriteButton = ({ anime }: { anime: Anime }) => {
  const toggle = useFavouriteStore((s) => s.toggleFavourite);

  const isFav = useFavouriteStore((s) => s.favouriteIds.includes(anime.mal_id));

  const icon = isFav ? <Heart color="red" /> : <Heart />;
  const label = isFav ? 'Remove Favourite' : 'Add Favourite';

  return (
    <Button
      icon={icon}
      onClick={() => {
        toggle(anime);
      }}>
      {label}
    </Button>
  );
};

export default FavouriteButton;
