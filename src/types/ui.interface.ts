import type { AnimeSearchQueryOrderBy } from './anime.request';

export interface CheckboxOption {
  id: string;
  label: string;
  checked: boolean;
}

export interface SorterItem {
  label: string;
  isActive: boolean;
  sortBy: SortParams;
  currentSort?: 'desc' | 'asc';
}

export interface SortParams {
  order_by?: string | AnimeSearchQueryOrderBy;
  sort?: 'desc' | 'asc';
}

export interface ActiveFilterItem {
  key: string;
  label: string;
  value: string | number;
}
