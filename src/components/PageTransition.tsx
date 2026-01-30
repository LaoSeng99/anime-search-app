import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { useLocation, useOutlet } from 'react-router';
import Footer from './layout/footer/Footer';

const pageVariants: Variants = {
  initial: (direction: string) => ({
    opacity: 0,
    scale: 0.98,
    filter: 'blur(4px)',
    x: direction === 'forward' ? 10 : direction === 'backward' ? -10 : 0,
  }),
  animate: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    x: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
  exit: (direction: string) => ({
    opacity: 0,
    scale: 1.02,
    filter: 'blur(10px)',
    x: direction === 'forward' ? -10 : direction === 'backward' ? 10 : 0,
    transition: { duration: 0.3, ease: [0.4, 0, 1, 1] },
  }),
};

export const PageTransition = () => {
  const location = useLocation();
  const outlet = useOutlet();

  const getDirection = () => {
    if (location.pathname.includes('/anime/')) return 'forward';
    return 'fade';
  };

  return (
    <AnimatePresence mode="popLayout" custom={getDirection()}>
      <motion.div
        key={location.pathname}
        custom={getDirection()}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="w-full min-h-screen relative">
        <main className="flex flex-col justify-between min-h-screen w-full">
          {outlet}
          <Footer />
        </main>
      </motion.div>
    </AnimatePresence>
  );
};
