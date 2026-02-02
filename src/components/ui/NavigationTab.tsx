import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { useMaxScroll } from '../../hooks/useMaxScroll';
import { useKeyboardAccessibility } from '../../hooks/useKeyboardAccessibility';

export interface NavTab {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

interface NavigationTabProps {
  initialTab?: string;
  tabs: NavTab[];
  onChange: (tab: NavTab) => void;
  enableKeyboardControl?: boolean;
}

const NavigationTab = ({
  initialTab,
  tabs,
  onChange,
  enableKeyboardControl = false,
}: NavigationTabProps) => {
  const [currentTab, setCurrentTab] = useState(
    tabs.find((t) => t.id === initialTab) ?? tabs[0] ?? null,
  );
  const containerRef = useRef<HTMLUListElement>(null);
  const maxScroll = useMaxScroll(containerRef);

  const handleTabChange = (tab: NavTab) => {
    setCurrentTab(tab);
    onChange(tab);
  };

  const handleNavigation = (direction: 'prev' | 'next') => {
    const currentIndex = tabs.findIndex((t) => t.id === currentTab.id);
    let nextIndex: number;

    if (direction === 'next') {
      nextIndex = (currentIndex + 1) % tabs.length; // back to the first
    } else {
      nextIndex = (currentIndex - 1 + tabs.length) % tabs.length; //back to the last
    }

    const nextTab = tabs[nextIndex];
    handleTabChange(nextTab);
  };

  useKeyboardAccessibility({
    onCtrlArrowLeft: () => handleNavigation('prev'),
    onCtrlArrowRight: () => handleNavigation('next'),
    enabled: enableKeyboardControl,
  });

  return (
    <nav
      className="mt-12 border-b border-white/5 overflow-hidden"
      aria-label="Anime details navigation">
      <div className="overflow-hidden mask-fade-edges">
        <motion.ul
          ref={containerRef}
          drag="x"
          dragConstraints={{ right: 0, left: -maxScroll }}
          dragElastic={0.2}
          className="flex gap-8 text-base text-gray-400 whitespace-nowrap cursor-pointer px-2">
          {tabs.map((tab) => {
            const isActive = tab.id === currentTab?.id;

            return (
              <li
                key={tab.id}
                onClick={() => handleTabChange(tab)}
                className={`group pb-4 transition-colors duration-300 hover:text-white relative shrink-0 select-none cursor-pointer ${
                  isActive ? 'text-white font-medium' : 'text-gray-400'
                }`}>
                <div className="relative z-10 flex items-center gap-2 px-2">
                  <motion.span
                    animate={isActive ? { scale: 1.1 } : { scale: 1 }}
                    className="flex items-center justify-center">
                    {tab.icon}
                  </motion.span>

                  <span className="relative">{tab.label}</span>
                </div>

                {isActive && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-white shadow-[0_0_8px_rgba(255,255,255,0.6)]"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}

                <motion.div
                  className="absolute inset-0 bg-white/5 rounded-t-md z-0"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  style={{ bottom: '4px' }}
                />
              </li>
            );
          })}
        </motion.ul>
      </div>
    </nav>
  );
};

export default NavigationTab;
