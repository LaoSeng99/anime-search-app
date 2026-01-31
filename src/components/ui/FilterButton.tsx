import { Filter, Loader2 } from 'lucide-react';
import Button from './Button';
import Checkbox from './Checkbox';
import { AnimatePresence, motion } from 'framer-motion';
import type { CheckboxOption } from '../../types/ui.interface';
import { useDropdown } from '../../hooks/useDropdown';
import Dropdown from './Dropdown';

interface FilterButtonProps {
  title: string;
  filters: CheckboxOption[];
  isLoading: boolean;
  onFilter: (id: string) => void;
  onReset: () => void;
}

const FilterButton = ({
  title,
  filters,
  isLoading = false,
  onFilter,
  onReset,
}: FilterButtonProps) => {
  const { isOpen, toggle, dropdownRef } = useDropdown();

  const handleCheckboxChange = (id: string) => {
    if (isLoading) return;
    onFilter(id);
  };

  const handleReset = () => {
    if (isLoading) return;
    onReset();
  };

  return (
    <Dropdown
      isOpen={isOpen}
      dropdownRef={dropdownRef}
      renderTrigger={
        <Button
          icon={<Filter size={16} />}
          disabled={isLoading}
          onClick={toggle}>
          Filters
        </Button>
      }>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-20 flex items-center justify-center bg-[#0f1117]/60 backdrop-blur-[1px] cursor-not-allowed">
            <Loader2 className="text-indigo-500 animate-spin" size={24} />
          </motion.div>
        )}
      </AnimatePresence>

      <div
        className={`p-4 transition-all duration-300 ${isLoading ? 'blur-[2px] pointer-events-none opacity-50' : ''}`}>
        <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] border-b border-white/5 pb-3 mb-4">
          {title}
        </h3>
        {/* Content */}
        <div className="flex flex-col gap-2">
          {filters.length > 0 &&
            filters.map((filter) => (
              <Checkbox
                key={filter.id}
                label={filter.label}
                checked={filter.checked}
                onChange={() => handleCheckboxChange(filter.id)}
              />
            ))}

          {filters.length === 0 && (
            <div className="flex items-center justify-center py-10">
              <div className="flex flex-col items-center gap-2">
                <p className="text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase">
                  No Filter Available
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2 mt-5">
          <Button
            outline={true}
            onClick={handleReset}
            disabled={isLoading || !filters.some((f) => f.checked)}
            className="w-full border-white/10 text-white/60 hover:text-white">
            Reset Filters
          </Button>
        </div>
      </div>
    </Dropdown>
  );
};

export default FilterButton;
