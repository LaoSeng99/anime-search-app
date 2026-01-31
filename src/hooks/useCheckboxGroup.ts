import { useEffect, useState } from 'react';
import type { CheckboxOption } from '../types/ui.interface';

export const useCheckboxGroup = (initialOptions: CheckboxOption[]) => {
  const [options, setOptions] = useState<CheckboxOption[]>(initialOptions);

  useEffect(() => {
    setOptions(initialOptions);
  }, [initialOptions]);

  const toggleOption = (id: string) => {
    setOptions((prev) =>
      prev.map((opt) =>
        opt.id === id ? { ...opt, checked: !opt.checked } : opt,
      ),
    );
  };

  const reset = () => setOptions(initialOptions);

  const selectedIds = options.filter((o) => o.checked).map((o) => o.id);

  return { options, toggleOption, reset, selectedIds };
};
