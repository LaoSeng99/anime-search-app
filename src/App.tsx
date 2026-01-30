import './App.css';
import { useLocation, useOutlet } from 'react-router';
import Header from './components/layout/header/Header';
import Footer from './components/layout/footer/Footer';
import { AnimatePresence, motion, type Variants } from 'framer-motion';
import { useEffect } from 'react';

/**
 * Animation Variants for Page Transitions
 */
const pageVariants: Variants = {
  initial: (direction: string) => ({
    opacity: 0,
    scale: 0.98, // Slight shrink for "entering" feel
    filter: 'blur(4px)', // Glassy entry effect
    // Conditional logic if you still want some horizontal movement
    x: direction === 'forward' ? 10 : direction === 'backward' ? -10 : 0,
  }),
  animate: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    x: 0,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: (direction: string) => ({
    opacity: 0,
    scale: 1.02, // Slight grow for "depth" feel when leaving
    filter: 'blur(10px)',
    x: direction === 'forward' ? -10 : direction === 'backward' ? 10 : 0,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 1, 1],
    },
  }),
};

function App() {
  const location = useLocation();
  const outlet = useOutlet();

  /**
   * Direction Logic
   * 'forward': Going to Detail Page
   * 'backward': Going back to Home/List
   * 'fade': Switching between main tabs
   */
  const getDirection = () => {
    if (location.pathname.includes('/anime/')) return 'forward';
    // Add logic here if you want to detect "Back" button
    return 'fade';
  };

  // Always scroll to top when path change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      <AnimatePresence mode="popLayout" custom={getDirection()}>
        <motion.div
          key={location.pathname}
          custom={getDirection()}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          style={{
            width: '100%',
            minHeight: '100vh',
            position: 'relative',
          }}>
          <main className="flex flex-col justify-between min-h-screen w-full">
            {outlet}
            <Footer />
          </main>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default App;
