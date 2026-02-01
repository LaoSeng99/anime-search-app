import { useCallback, useMemo, useState } from 'react';
import type { CheckboxOption } from '../types/ui.interface';

/**
 * Not support single
 */
export const useCheckboxGroup = (
  initialOptions: CheckboxOption[],
  /**
   * return currently selected Ids
   */
  onChange?: (selectedIds: string[]) => void,
) => {
  const [selectedIdSet, setSelectedIdSet] = useState<Set<string>>(
    () => new Set(initialOptions.filter((o) => o.checked).map((o) => o.id)),
  );

  const handleUpdate = useCallback(
    (updater: (prev: Set<string>) => Set<string>) => {
      setSelectedIdSet((prev) => {
        const next = updater(new Set(prev));
        onChange?.(Array.from(next));
        return next;
      });
    },
    [onChange],
  );

  // multi Toggle
  const toggleOption = useCallback(
    (id: string) => {
      handleUpdate((set) => {
        if (set.has(id)) set.delete(id);
        else set.add(id);
        return set;
      });
    },
    [handleUpdate],
  );

  const toggleSingle = useCallback(
    (id: string) => {
      handleUpdate((set) => {
        if (set.has(id)) {
          set.delete(id);
        } else {
          set.clear();
          set.add(id);
        }
        return set;
      });
    },
    [handleUpdate],
  );

  // 重置
  const reset = useCallback(() => {
    handleUpdate(
      () => new Set(initialOptions.filter((o) => o.checked).map((o) => o.id)),
    );
  }, [handleUpdate, initialOptions]);

  const options = useMemo(() => {
    return initialOptions.map((opt) => ({
      ...opt,
      checked: selectedIdSet.has(opt.id),
    }));
  }, [initialOptions, selectedIdSet]);

  const selectedIds = useMemo(() => Array.from(selectedIdSet), [selectedIdSet]);

  return {
    options,
    toggleOption,
    toggleSingle,
    reset,
    selectedIds,
    setSelectedIds: (ids: string[]) => setSelectedIdSet(new Set(ids)),
  };
};
