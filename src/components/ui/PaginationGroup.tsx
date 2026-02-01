import { useSearchParams } from 'react-router';
import Button from './Button';
import usePagination from '../../hooks/usePagination';

interface PaginationGroupProps {
  itemLength: number;
  currentPage: number;
  perPage: number;
  isLoading: boolean;
  onChangePage: (page: number) => void;
}

const PaginationGroup = ({
  currentPage = 1,
  itemLength,
  perPage,
  isLoading = false,
  onChangePage,
}: PaginationGroupProps) => {
  if (!currentPage || currentPage < 0) currentPage = 1;

  const [searchParams, setSearchParams] = useSearchParams();
  const totalPage = Math.ceil(itemLength / perPage) || 1;

  const { pages, showLeftDots, showRightDots, isFirst, isLast } = usePagination(
    {
      totalPage,
      currentPage,
      siblingCount: 2,
    },
  );

  const handlePageChange = (page: number) => {
    if (isLoading || page < 1 || page > totalPage) return;

    onChangePage(page);
    searchParams.set('page', page.toString());
    setSearchParams(searchParams);
  };

  return (
    <div className="flex items-center justify-center gap-2 p-4">
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
    </div>
  );
};

export default PaginationGroup;
