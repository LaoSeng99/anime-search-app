import { useEffect, type RefObject } from 'react';
import type { SearchBoxHandle } from '../components/ui/SearchBox';

interface KeyboardAccessOptions {
  onArrowLeft?: () => void;
  onArrowRight?: () => void;
  onCtrlArrowLeft?: () => void;
  onCtrlArrowRight?: () => void;
  onEscape?: () => void;
  searchBoxRef?: RefObject<SearchBoxHandle | null>;

  enabled?: boolean;
}

export const useKeyboardAccessibility = ({
  onArrowLeft,
  onArrowRight,
  onCtrlArrowRight,
  onCtrlArrowLeft,
  onEscape,
  searchBoxRef,
  enabled = true,
}: KeyboardAccessOptions) => {
  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.repeat) return;

      const activeElement = document.activeElement as HTMLElement;
      const isTyping =
        activeElement.tagName === 'INPUT' ||
        activeElement.tagName === 'TEXTAREA' ||
        activeElement.isContentEditable;

      if (event.key === 'Escape') {
        onEscape?.();
        if (isTyping) {
          activeElement.blur();
        }
        return;
      }

      //If is typing ,disable the hotkey
      if (isTyping) return;

      // global hot key
      // "S" to focus search element
      if (event.key.toLowerCase() === 's' && searchBoxRef?.current) {
        event.preventDefault(); // 防止在输入框里打入一个 's'
        const inputRef = searchBoxRef?.current?.inputRef;
        inputRef?.current?.focus();
        return;
      }

      // "Arrow key" pagination
      if (event.ctrlKey && event.key === 'ArrowLeft') {
        onCtrlArrowLeft?.();
        return;
      } else if (event.ctrlKey && event.key === 'ArrowRight') {
        onCtrlArrowRight?.();
        return;
      } else if (event.key === 'ArrowLeft') {
        onArrowLeft?.();
      } else if (event.key === 'ArrowRight') {
        onArrowRight?.();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    enabled,
    onArrowLeft,
    onArrowRight,
    onCtrlArrowLeft,
    onCtrlArrowRight,
    onEscape,
    searchBoxRef,
  ]);
};
