import Button from './Button';
import usePagination from '../../hooks/usePagination';
import { useKeyboardAccessibility } from '../../hooks/useKeyboardAccessibility';
import { useUrlQueryState } from '../../hooks/useUrlQueryState';
import {
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
} from 'lucide-react';

interface PaginationGroupProps {
  totalPage?: number; // pagination.last_visible_page
  itemLength?: number; // use when totalPage is not available
  perPage?: number; // use with item length
  currentPage: number;
  isLoading: boolean;
  onChangePage?: (page: number) => void;
}

const PaginationGroup = ({
  currentPage = 1,
  itemLength = 0,
  perPage = 6,
  totalPage: providedTotalPage,
  isLoading = false,
  onChangePage,
}: PaginationGroupProps) => {
  if (!currentPage || currentPage < 0) currentPage = 1;

  const { setSingleParam } = useUrlQueryState();
  const totalPage = (providedTotalPage ?? Math.ceil(itemLength / perPage)) || 1;

  const { pages, showLeftDots, showRightDots, isFirst, isLast } = usePagination(
    {
      totalPage,
      currentPage,
      siblingCount: 1,
    },
  );

  const handlePageChange = (page: number) => {
    if (isLoading || page < 1 || page > totalPage) return;

    onChangePage?.(page);
    setSingleParam('page', page);
  };

  useKeyboardAccessibility({
    onArrowLeft: () => {
      handlePageChange(currentPage - 1);
    },
    onArrowRight: () => {
      handlePageChange(currentPage + 1);
    },
    enabled: !isLoading,
  });

  return (
    <div className="flex flex-col items-center gap-4 py-6 w-full">
      <div className="flex items-center justify-between w-full md:justify-center gap-2">
        {/* --- Left Controls --- */}
        <div className="flex items-center gap-1">
          {/* First: hide on mobile */}
          <Button
            outline
            size="icon"
            icon={<ChevronsLeft />}
            className="hidden sm:flex"
            disabled={isFirst || isLoading}
            onClick={() => handlePageChange(1)}
            title="First Page"></Button>

          {/* Previous: */}
          <Button
            outline
            size="icon"
            icon={<ChevronLeft />}
            disabled={isFirst || isLoading}
            onClick={() => handlePageChange(currentPage - 1)}></Button>
        </div>

        {/* --- Middle: Mobile Layout (Text Only) --- */}
        <div className="flex items-center justify-center text-sm font-medium text-zinc-400 md:hidden">
          Page <span className="text-white mx-1">{currentPage}</span> of{' '}
          <span className="text-white mx-1">{totalPage}</span>
        </div>

        {/* --- Middle: Desktop Layout (Buttons) --- */}
        <div className="hidden md:flex gap-1">
          {showLeftDots && (
            <Button outline disabled>
              ...
            </Button>
          )}

          {pages.map((page) => {
            if (page < currentPage) {
              return (
                <Button
                  key={page}
                  outline
                  onClick={() => handlePageChange(page)}>
                  {page}
                </Button>
              );
            }
            return null;
          })}

          {/* Current Page */}
          <Button>{currentPage}</Button>

          {pages.map((page) => {
            if (page > currentPage) {
              return (
                <Button
                  key={page}
                  outline
                  onClick={() => handlePageChange(page)}>
                  {page}
                </Button>
              );
            }
            return null;
          })}

          {showRightDots && (
            <Button outline disabled>
              ...
            </Button>
          )}
        </div>

        {/* --- Right Controls --- */}
        <div className="flex items-center gap-1">
          {/* Next */}
          <Button
            outline
            size="icon"
            icon={<ChevronRight />}
            disabled={isLast || isLoading}
            onClick={() => handlePageChange(currentPage + 1)}></Button>

          {/* Last:hide on mobile */}
          <Button
            outline
            size="icon"
            icon={<ChevronsRight />}
            className="hidden sm:flex"
            disabled={isLast || isLoading}
            onClick={() => handlePageChange(totalPage)}
            title="Last Page"></Button>
        </div>
      </div>

      {/* For desktop */}
      <div className="items-center justify-center text-sm font-medium text-zinc-400 hidden md:flex">
        Page <span className="text-white mx-1">{currentPage}</span> of{' '}
        <span className="text-white mx-1">{totalPage}</span>
      </div>
    </div>
  );
};

export default PaginationGroup;
