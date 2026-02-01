import { AnimatePresence, motion } from 'framer-motion';
import { ChevronUp } from 'lucide-react';
import { cn } from '../../utils/ui.util';

interface AccordionSectionProps {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
  className?: string;
}

const AccordionSection = ({
  title,
  isOpen,
  onToggle,
  children,
  className,
}: AccordionSectionProps) => {
  return (
    <section
      className={cn([
        'mb-8 flex flex-col items-center w-full px-0',
        className,
      ])}>
      {/* Clickable Header */}
      <div
        onClick={onToggle}
        className="flex justify-between items-center w-full cursor-pointer hover:bg-white/5 py-2 transition-colors group">
        <span className="text-sm font-semibold uppercase tracking-widest text-white group-hover:text-gray-300">
          {title}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 0 : 180 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}>
          <ChevronUp size={16} className="text-white" />
        </motion.div>
      </div>

      {/* Animated Content Wrapper */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key={`${title}-content`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden w-full">
            <div className="pt-4 pb-2">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default AccordionSection;
