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
import { SEARCH_DEBOUNCE } from '../../../types/app.constant';
import { useDebouncedCallback } from 'use-debounce';

interface AnimeListToolbar {
  isFetching: boolean;
}

const AnimeListToolbar = ({ isFetching = false }: AnimeListToolbar) => {
  const searchBoxRef = useRef<SearchBoxHandle>(null);
  const { urlRequest, setSingleParam } = useUrlQueryState();

  const [searchQuery, setSearchQuery] = useState<string>(urlRequest.q ?? '');

  const debounceUpdateSearchQuery = useDebouncedCallback((query: string) => {
    if (searchQuery !== query) setSearchQuery(query);
    if (urlRequest.q !== query) setSingleParam('q', query);
  }, SEARCH_DEBOUNCE);

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

  // If url change by user click / other programming control, sync to the searchbox input
  useEffect(() => {
    debounceUpdateSearchQuery(urlRequest.q ?? '');
  }, [urlRequest.q, debounceUpdateSearchQuery]);

  const handleSearch = (query: string) => {
    //Update to input
    setSearchQuery(query);
    debounceUpdateSearchQuery(query);
  };

  return (
    <div className="flex justify-between">
      <div className="relative flex-1 group">
        <SearchBox
          value={searchQuery}
          onClear={() => setSearchQuery('')}
          onChange={handleSearch}
          ref={searchBoxRef}></SearchBox>
      </div>
      <SorterContent isFetching={isFetching} />
    </div>
  );
};

const SorterContent = ({ isFetching = false }: { isFetching: boolean }) => {
  const { urlRequest, updateUrl } = useUrlQueryState();

  const [sortParams, setSortParams] = useState<SortParams>({
    order_by: urlRequest.order_by,
    sort: urlRequest.sort,
  });

  const sorterList = useMemo(
    () => getAnimeSorterList(sortParams),
    [sortParams],
  );

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
    <>
      <SorterButton
        sorters={sorterList}
        isLoading={isFetching}
        onClick={handleSort}
        onReset={resetSort}
      />
    </>
  );
};

export default AnimeListToolbar;
