import { type RefObject, useState, useEffect } from 'react';

/**
 * Custom hook to calculate the maximum horizontal scrollable distance.
 * Primarily used for Framer Motion drag constraints in carousels.
 * * @param ref - React RefObject pointing to the scrollable container.
 * @param dependency - State or data (e.g., TanStack Query data) that triggers a recalculation when changed.
 */
export const useMaxScroll = (
  ref: RefObject<HTMLElement | null>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dependency?: any,
) => {
  const [maxScroll, setMaxScroll] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    /**
     * Calculates the difference between the total content width and the visible container width.
     */
    const updateWidth = () => {
      const scrollWidth = element.scrollWidth; // Total width of the content inside
      const offsetWidth = element.offsetWidth; // Visible width of the container

      // If content is wider than container, set the scroll limit; otherwise, set to 0.
      setMaxScroll(scrollWidth > offsetWidth ? scrollWidth - offsetWidth : 0);
    };

    // Observe size changes of the element (e.g., window resizing or dynamic content loading)
    const resizeObserver = new ResizeObserver(() => {
      updateWidth();
    });

    resizeObserver.observe(element);

    // Initial calculation after component mounts or dependency updates
    updateWidth();

    // Clean up observer on component unmount
    return () => {
      resizeObserver.disconnect();
    };
  }, [dependency, ref]); // Re-run if data changes or the ref assignment changes

  return maxScroll;
};
