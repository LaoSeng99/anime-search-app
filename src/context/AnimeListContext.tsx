import { createContext, useState, type ReactNode } from 'react';

type AnimeListUIContextType = {
  isMobileFilterOpen: boolean;
  toggleMobileFilter: () => void;
  closeMobileFilter: () => void;
};

const AnimeListUIContext = createContext<AnimeListUIContextType | undefined>(
  undefined,
);

export const AnimeListUIProvider = ({ children }: { children: ReactNode }) => {
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  return (
    <AnimeListUIContext.Provider
      value={{
        isMobileFilterOpen,
        toggleMobileFilter: () => setIsMobileFilterOpen((prev) => !prev),
        closeMobileFilter: () => setIsMobileFilterOpen(false),
      }}>
      {children}
    </AnimeListUIContext.Provider>
  );
};

export default AnimeListUIContext;
