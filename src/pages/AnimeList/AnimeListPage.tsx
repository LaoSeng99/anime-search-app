import { useState } from 'react';

import BackgroundSection from '../../components/layout/BackgroundSection';

import { cn } from '../../utils/ui.util';
import { AnimeListUIProvider } from '../../context/AnimeListContext';
import AnimeListSection from './_Components/AnimeListSection';

const AnimeListPage = () => {
  const [currentBackgroundUrl, setCurrentBackgroundUrl] = useState('');

  const handleBackgroundUrl = (url: string) => {
    setCurrentBackgroundUrl(url);
  };

  return (
    <AnimeListUIProvider>
      <div className="relative w-full overflow-hidden">
        <BackgroundSection
          currentImageUrl={currentBackgroundUrl}></BackgroundSection>
        <div className="absolute inset-0 z-10 backdrop-blur-sm bg-black/10" />

        <section
          className={cn([
            'relative z-20 h-full min-w-full flex flex-col items-center',
            'pt-18',
          ])}>
          <h1
            className={cn([
              'text-white  font-extrabold tracking-tight drop-shadow-xl self-start   w-full h-full',
              'text-3xl sm:text-4xl md:text-5xl lg:text-6xl',
              'px-8 md:px-16',
              'py-8 pb-0 lg:pb-8',
              ' bg-black/80 lg:bg-transparent',
            ])}>
            Anime Catalog
          </h1>

          <AnimeListSection onChange={handleBackgroundUrl} />
        </section>
      </div>
    </AnimeListUIProvider>
  );
};

export default AnimeListPage;
