import { create } from 'zustand';

interface BackgroundConfig {
  embedUrl: string;
  backdropUrl?: string;
  isLoop?: boolean;
}

interface BackgroundState {
  config: BackgroundConfig | null;
  isVisible: boolean;
  setBackground: (config: BackgroundConfig | null) => void;
  clearBackground: () => void;
  isMuted: boolean;
  setMuted: (muted: boolean) => void;
}

export const useBackgroundStore = create<BackgroundState>((set) => ({
  config: null,
  isVisible: false,
  isMuted: true,

  setBackground: (config) =>
    set({
      config,
      isVisible: !!config,
    }),

  clearBackground: () =>
    set({
      config: null,
      isVisible: false,
    }),

  setMuted: (muted) => set({ isMuted: muted }),
}));
