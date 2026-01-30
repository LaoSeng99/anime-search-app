import { useEffect } from 'react';
import { useLocation } from 'react-router';
import Header from './header/Header';
import { PageTransition } from './PageTransition';

const MainLayout = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header />
      <PageTransition />
    </div>
  );
};

export default MainLayout;
