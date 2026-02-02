import Button from './Button';
import usePagination from '../../hooks/usePagination';
import { useKeyboardAccessibility } from '../../hooks/useKeyboardAccessibility';
import { useUrlQueryState } from '../../hooks/useUrlQueryState';

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
      siblingCount: 2,
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
    <div className="flex items-center justify-center gap-2 p-4">
      {/* Last */}
      <Button
        outline
        disabled={isFirst || isLoading}
        onClick={() => handlePageChange(1)}>
        First
      </Button>
      {/* Previous */}
      <Button
        outline
        disabled={isFirst || isLoading}
        onClick={() => handlePageChange(currentPage - 1)}>
        Previous
      </Button>

      <div className="flex gap-1">
        {showLeftDots && (
          <Button outline disabled>
            ...
          </Button>
        )}

        {pages.map((page) => {
          if (page < currentPage) {
            return (
              <Button key={page} outline onClick={() => handlePageChange(page)}>
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
              <Button key={page} outline onClick={() => handlePageChange(page)}>
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

      {/* Next */}
      <Button
        outline
        disabled={isLast || isLoading}
        onClick={() => handlePageChange(currentPage + 1)}>
        Next
      </Button>
      {/* Last */}
      <Button
        outline
        disabled={isLast || isLoading}
        onClick={() => handlePageChange(totalPage)}>
        Last
      </Button>
    </div>
  );
};

export default PaginationGroup;
