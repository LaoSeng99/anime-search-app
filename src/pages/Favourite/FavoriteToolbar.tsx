import { HeartCrack } from 'lucide-react';
import Button from '../../components/ui/Button';
import FilterButton from '../../components/ui/FilterButton';
import SorterButton from '../../components/ui/SorterButton';
import type {
  CheckboxOption,
  SorterItem,
  SortParams,
} from '../../types/ui.interface';

interface FavoriteToolbarProps {
  isLoading: boolean;
  totalItems: number;

  filterOptions: CheckboxOption[];
  onFilter: (id: string) => void;
  onFilterReset: () => void;

  sorters: SorterItem[];
  onSorting: (params: SortParams) => void;
  onSortingReset: () => void;

  onRemoveAllFavourite: () => void;
}

const FavouriteToolbar = ({
  isLoading,
  totalItems,
  filterOptions,
  onFilter,
  onFilterReset,
  sorters,
  onSorting,
  onSortingReset,
  onRemoveAllFavourite,
}: FavoriteToolbarProps) => {
  return (
    <div className="flex gap-6 justify-between">
      <div className="flex gap-6">
        <FilterButton
          title="Anime Type"
          filters={filterOptions}
          isLoading={isLoading}
          onFilter={onFilter}
          onReset={onFilterReset}
        />

        <Button
          icon={<HeartCrack />}
          variant="danger"
          onClick={onRemoveAllFavourite}
          disabled={totalItems === 0}>
          Remove all favourites
        </Button>
      </div>

      <SorterButton
        isLoading={isLoading}
        onReset={() => onSortingReset}
        onClick={onSorting}
        sorters={sorters}></SorterButton>
    </div>
  );
};

export default FavouriteToolbar;
