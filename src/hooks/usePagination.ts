import { useMemo } from 'react';

interface UsePaginationProps {
  totalPage: number;
  currentPage: number;
  siblingCount?: number;
}

export const DOTS = '...';

const usePagination = ({
  totalPage,
  currentPage,
  siblingCount = 1,
}: UsePaginationProps) => {
  const paginationRange = useMemo(() => {
    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPage);

    const showLeftDots = leftSiblingIndex > 1;
    const showRightDots = rightSiblingIndex < totalPage;

    const pages = [];
    for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
      if (i !== currentPage) pages.push(i);
    }

    return {
      pages,
      showLeftDots,
      showRightDots,
      isFirst: currentPage === 1,
      isLast: currentPage === totalPage,
    };
  }, [totalPage, currentPage, siblingCount]);

  return paginationRange;
};

export default usePagination;
