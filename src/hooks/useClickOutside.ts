import { useEffect, type RefObject } from 'react';

/**
 * Custom hook to detect clicks outside of a specific element.
 * Useful for closing modals, dropdowns, or search results.
 */
export const useClickOutside = (
  ref: RefObject<HTMLElement | null>,
  handler: () => void,
) => {
  useEffect(() => {
    // Optimization: Define the listener inside useEffect to avoid unnecessary re-renders
    const listener = (event: MouseEvent | TouchEvent) => {
      const el = ref?.current;

      // Do nothing if clicking the target element or its children
      if (!el || el.contains((event?.target as Node) || null)) {
        return;
      }

      handler();
    };

    // Use 'mousedown' instead of 'click' for better responsiveness
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]); // Dependencies ensure the listener stays updated
};
