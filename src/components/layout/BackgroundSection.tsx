import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';

const BackgroundSection = React.memo(
  ({ currentImageUrl }: { currentImageUrl: string }) => {
    return (
      <div className="absolute inset-0 z-0 overflow-hidden">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentImageUrl}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: 'easeInOut' }}
            className="absolute inset-0"
            style={{
              backgroundImage: `url("${currentImageUrl}")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        </AnimatePresence>
      </div>
    );
  },
);

export default BackgroundSection;
