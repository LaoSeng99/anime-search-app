import { AnimatePresence, motion } from 'framer-motion';
import TrailerVideo from '../TrailerVideo';
import { useBackgroundStore } from '../../hooks/useBackgroundStore';

export const StickyVideoBackground = () => {
  const { config, isVisible } = useBackgroundStore();

  const embedUrl = config?.embedUrl ?? '';
  const backdropUrl = config?.backdropUrl ?? '';

  return (
    <div className="fixed top-0 left-0 w-full translate-y-20 md:translate-y-0 h-[56.25vw] md:h-[90vw] md:max-h-[80vh] overflow-hidden pointer-events-none">
      <div className="absolute inset-0 z-10 bg-linear-to-t from-neutral-950 via-transparent to-transparent" />
      <AnimatePresence mode="wait">
        {isVisible && (
          <motion.div key={embedUrl} className="relative w-full h-full">
            {/* Background fill layer: Stretches and severely blurs the video, filling the left and right margins */}{' '}
            <div className="absolute inset-0 scale-125 blur-3xl opacity-50">
              <TrailerVideo embedUrl={embedUrl} backdropUrl={backdropUrl} />
            </div>
            <div className="relative mx-auto aspect-video h-full shadow-[0_0_100px_rgba(0,0,0,0.5)] scale-110  ">
              <TrailerVideo
                embedUrl={embedUrl}
                backdropUrl={backdropUrl}
                loop={config?.isLoop}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
