import { useEffect, useMemo, useRef, useState } from 'react';
import SorterButton from '../../../components/ui/SorterButton';
import { useKeyboardAccessibilityState } from '../../../hooks/useKeyboardAccessibilityState';
import SearchBox, {
  type SearchBoxHandle,
} from '../../../components/ui/SearchBox';
import { useKeyboardAccessibility } from '../../../hooks/useKeyboardAccessibility';
import { useUrlQueryState } from '../../../hooks/useUrlQueryState';
import type { SortParams } from '../../../types/ui.interface';
import { getAnimeSorterList } from '../../../utils/anime.util';
import { useDebounce } from '../../../hooks/useDebounce';

interface AnimeListToolbar {
  isFetching: boolean;
}

const AnimeListToolbar = ({ isFetching = false }: AnimeListToolbar) => {
  const searchBoxRef = useRef<SearchBoxHandle>(null);

  const { urlRequest, setSingleParam, updateUrl } = useUrlQueryState();
  const [sortParams, setSortParams] = useState<SortParams>({
    order_by: urlRequest.order_by,
    sort: urlRequest.sort,
  });
  const sorterList = useMemo(
    () => getAnimeSorterList(sortParams),
    [sortParams],
  );

  const setForcedDisabled = useKeyboardAccessibilityState(
    (s) => s.setForcedDisabled,
  );

  useKeyboardAccessibility({
    searchBoxRef: searchBoxRef,
    onEscape: () => {
      searchBoxRef.current?.clear();
    },
    enabled: true,
  });

  useEffect(() => {
    // disabling header search box keyboard accessibility
    setForcedDisabled(true);

    // when destroying page set to default
    return () => setForcedDisabled(false);
  }, [setForcedDisabled]);

  const handleSearch = (query: string) => {
    setSingleParam('q', query);
  };

  const handleSort = (sort: SortParams) => {
    updateUrl([
      { key: 'sort', value: sort.sort },
      { key: 'order_by', value: sort.order_by },
    ]);

    setSortParams(sort);
  };

  const resetSort = () => {
    updateUrl([
      { key: 'sort', value: null },
      { key: 'order_by', value: null },
    ]);
    setSortParams({});
  };

  return (
    <div className="flex justify-between">
      <SearchBox
        ref={searchBoxRef}
        onSearch={handleSearch}
        onClear={() => {}}
        onFocus={() => {}}></SearchBox>

      <SorterButton
        sorters={sorterList}
        isLoading={isFetching}
        onClick={handleSort}
        onReset={resetSort}
      />
    </div>
  );
};

export default AnimeListToolbar;
