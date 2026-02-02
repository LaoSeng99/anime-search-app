import { useRef } from 'react';
import { useMaxScroll } from '../../hooks/useMaxScroll';
import ErrorState from './ErrorState';
import { motion } from 'framer-motion';

interface HorizontalCarouselProps {
  children: React.ReactNode;
  isLoading?: boolean;
  error?: Error | null;
  refetch?: () => void;
}

export const HorizontalCarousel = ({
  children,
  isLoading,
  error,
  refetch,
}: HorizontalCarouselProps) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const maxScroll = useMaxScroll(carouselRef, [isLoading]);

  return (
    <div className="flex flex-row overflow-x-auto snap-x">
      <div className="overflow-hidden w-full">
        {/* horizontal carousel */}
        <motion.div
          ref={carouselRef}
          className="cursor-grab active:cursor-grabbing relative">
          {error && (
            <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/70 backdrop-blur-[2px] rounded-lg ">
              <ErrorState
                title="Unable to load special show"
                onRetry={() => refetch && refetch()}
              />
            </div>
          )}

          <motion.div
            drag={error ? false : 'x'}
            className="flex gap-6 px-8 md:px-16 cursor-grab active:cursor-grabbing"
            dragConstraints={{ right: 0, left: -maxScroll }}
            dragElastic={0.1}
            dragTransition={{ power: 0.2, timeConstant: 200 }}>
            {children}

            <div className="min-w-10 h-1" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
