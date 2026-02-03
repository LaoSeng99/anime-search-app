import { AnimatePresence, motion } from 'framer-motion';
import { useLayoutEffect, useRef, useState, type ReactNode } from 'react';

interface AnimeDropdownProps {
  isOpen: boolean;
  dropdownRef: React.RefObject<HTMLDivElement | null>;
  renderTrigger: ReactNode;
  children: ReactNode;
  className?: string;
}

const Dropdown = ({
  isOpen,
  dropdownRef,
  renderTrigger,
  children,
  className = 'w-64',
}: AnimeDropdownProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ isUp: false, isRight: false });

  useLayoutEffect(() => {
    if (isOpen && dropdownRef.current && contentRef.current) {
      const trigger = dropdownRef.current.getBoundingClientRect();
      const content = contentRef.current.getBoundingClientRect();

      // Detection logic: Check viewport boundaries
      const shouldShowUp =
        window.innerHeight - trigger.bottom < content.height &&
        trigger.top > content.height;
      const shouldAlignRight = window.innerWidth - trigger.left < content.width;

      setPosition({ isUp: shouldShowUp, isRight: shouldAlignRight });
    }
  }, [dropdownRef, isOpen]);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {renderTrigger}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={contentRef}
            // Framer motion uses transform-origin automatically based on layout
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className={`
              absolute z-50 rounded-xl bg-[#090909] border border-white/10 shadow-2xl
              ${className}
              ${position.isUp ? 'bottom-full mb-3 origin-bottom' : 'top-full origin-top'}
              ${position.isRight ? 'right-0' : 'left-0'}
            `}>
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dropdown;
