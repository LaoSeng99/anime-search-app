import type { SorterItem, SortParams } from '../../types/ui.interface';
import Button from './Button';
import { ChevronDown, ChevronsUpDown, ChevronUp, Loader2 } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useDropdown } from '../../hooks/useDropdown';
import Dropdown from './Dropdown';

interface SorterButtonProps {
  sorters: SorterItem[];
  isLoading: boolean;
  onClick: (params: SortParams) => void;
  onReset: () => void;
}

const SorterButton = ({
  sorters,
  isLoading,
  onClick,
  onReset,
}: SorterButtonProps) => {
  const { isOpen, toggle, dropdownRef } = useDropdown();

  const handleClick = (params: SortParams) => {
    if (isLoading) return;
    onClick(params);
  };

  const handleReset = () => {
    if (isLoading) return;
    onReset();
  };

  return (
    <Dropdown
      isOpen={isOpen}
      dropdownRef={dropdownRef}
      renderTrigger={TriggerButton(toggle)}>
      <AnimatePresence>{isLoading && LoadingState()}</AnimatePresence>

      <div
        className={`p-4 transition-all duration-300 ${isLoading ? 'blur-[2px] pointer-events-none opacity-50' : ''}`}>
        {/* Content */}
        <div className="flex flex-col gap-2">
          {sorters.map((sorter) => (
            <div
              key={sorter.label}
              onClick={() => handleClick(sorter.sortBy)}
              className="group cursor-pointer py-1 flex items-center justify-between w-full">
              <div className="flex items-center gap-3">
                <div
                  className={`h-4 w-0.5 transition-all ${sorter.isActive ? 'bg-white' : 'bg-transparent group-hover:bg-gray-600'}`}
                />

                {/* Label */}
                <span
                  className={`text-base font-medium transition-all ${sorter.isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'}`}>
                  {sorter.label}
                </span>
              </div>

              <div className="pr-2">
                {sorter.isActive ? (
                  sorter.currentSort === 'asc' ? (
                    <ChevronUp className="w-4 h-4 text-white" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-white" />
                  )
                ) : (
                  <ChevronsUpDown className="w-4 h-4 text-slate-700 opacity-0 group-hover:opacity-100 transition-opacity" />
                )}
              </div>
            </div>
          ))}

          {sorters.length === 0 && EmptyState()}
        </div>

        <div className="flex flex-col gap-2 mt-5">
          <Button
            outline
            onClick={handleReset}
            disabled={isLoading || !sorters.some((s) => s.isActive)}
            className="w-full border-white/10 text-white/60 hover:text-white">
            Reset Sort
          </Button>
        </div>
      </div>
    </Dropdown>
  );
};

const TriggerButton = (toggle: () => void) => {
  return (
    <Button
      variant={'ghost'}
      outline
      icon={<ChevronDown size={16} />}
      onClick={toggle}
      iconPosition="right">
      Sort By
    </Button>
  );
};

const LoadingState = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="absolute inset-0 z-20 flex items-center justify-center bg-[#0f1117]/60 backdrop-blur-[1px] cursor-not-allowed">
    <Loader2 className="text-indigo-500 animate-spin" size={24} />
  </motion.div>
);

const EmptyState = () => (
  <div className="flex items-center justify-center py-6">
    <p className="text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase">
      No Sorters Available
    </p>
  </div>
);

export default SorterButton;
