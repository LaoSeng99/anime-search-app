import { create } from 'zustand';

interface KeyboardAccessibilityState {
  isUserEnabled: boolean;
  isForcedDisabled: boolean;

  setUserEnabled: (enabled: boolean) => void;
  setForcedDisabled: (disabled: boolean) => void;
}

export const useKeyboardAccessibilityState = create<KeyboardAccessibilityState>(
  (set, get) => ({
    isUserEnabled: true,
    isForcedDisabled: false,
    setUserEnabled: (val) => set({ isUserEnabled: val }),
    setForcedDisabled: (val) => set({ isForcedDisabled: val }),
  }),
);
