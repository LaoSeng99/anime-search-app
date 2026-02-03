import { HeartCrack } from 'lucide-react';
import Button from '../../components/ui/Button';
import FilterButton from '../../components/ui/FilterButton';
import SorterButton from '../../components/ui/SorterButton';
import type {
  CheckboxOption,
  SorterItem,
  SortParams,
} from '../../types/ui.interface';
import { cn } from '../../utils/ui.util';

interface FavouriteToolbarProps {
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
}: FavouriteToolbarProps) => {
  return (
    <div
      className={cn([
        'flex flex-col gap-6 md:gap-6 md:flex-row justify-between',
      ])}>
      <div className="relative flex gap-6 items-center flex-1 group">
        <FilterButton
          title="Anime Type"
          filters={filterOptions}
          isLoading={isLoading}
          onFilter={onFilter}
          onReset={onFilterReset}
        />

        <Button
          icon={<HeartCrack />}
          danger
          onClick={onRemoveAllFavourite}
          disabled={totalItems === 0}>
          Remove all favourites
        </Button>
      </div>

      <SorterButton
        isLoading={isLoading}
        onReset={onSortingReset}
        onClick={(p) => onSorting(p)}
        sorters={sorters}></SorterButton>
    </div>
  );
};

export default FavouriteToolbar;
