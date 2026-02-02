import { useEffect } from 'react';
import { useLocation } from 'react-router';
import Header from './header/Header';
import { PageTransition } from './PageTransition';
import { StickyVideoBackground } from './StickyVideoBackground';

const MainLayout = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const isAnimeDetail = /^\/anime\/\d+/.test(pathname);
    if (!isAnimeDetail) {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      <StickyVideoBackground />

      <PageTransition />
    </div>
  );
};

export default MainLayout;
