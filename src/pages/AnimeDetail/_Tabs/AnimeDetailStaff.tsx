import { useQuery } from '@tanstack/react-query';
import { useOutletContext } from 'react-router';
import { getAnimeStaff } from '../../../services/animeService';
import type { Anime, AnimeStaff } from '../../../types/anime';
import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useDebouncedCallback } from 'use-debounce';
import MotionImage from '../../../components/ui/MotionImage';
import React from 'react';
import { UserPen } from 'lucide-react';

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.4,
    },
  }),
};

const ITEMS_PER_BATCH = 12;

const AnimeDetailStaff = () => {
  const { anime, isLoading: isAnimeLoading } = useOutletContext<{
    anime: Anime;
    isLoading: boolean;
  }>();

  const { data: staff, isLoading: staffLoading } = useQuery({
    queryKey: ['anime', anime?.mal_id, 'staff'],
    queryFn: async () => {
      const data = await getAnimeStaff(anime.mal_id);
      return data.data;
    },
    enabled: !!anime?.mal_id && !isAnimeLoading,
  });

  const [isInternalLoading, setIsInternalLoading] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [displayCount, setDisplayCount] = useState(ITEMS_PER_BATCH);

  const { ref: loadMoreRef, inView } = useInView({
    rootMargin: '100px',
  });

  const debouncedLoadMore = useDebouncedCallback(() => {
    setIsAnimating(true);
    setDisplayCount((prev) => prev + ITEMS_PER_BATCH);
    setIsInternalLoading(false);
  }, 300);

  const renderList = useMemo(() => {
    if (!staff) return [];
    const groups: Record<string, AnimeStaff[]> = {};
    staff.forEach((member) => {
      member.positions.forEach((pos) => {
        if (!groups[pos]) groups[pos] = [];
        groups[pos].push(member);
      });
    });

    const list: Array<
      | { type: 'header'; label: string }
      | { type: 'card'; data: AnimeStaff; pos: string }
    > = [];

    Object.entries(groups).forEach(([position, members]) => {
      list.push({ type: 'header', label: position });
      members.forEach((m) => {
        list.push({ type: 'card', data: m, pos: position });
      });
    });
    return list;
  }, [staff]);

  useEffect(() => {
    if (
      inView &&
      displayCount < renderList.length &&
      !isInternalLoading &&
      !isAnimating
    ) {
      debouncedLoadMore();
    }
  }, [
    inView,
    displayCount,
    renderList.length,
    isInternalLoading,
    isAnimating,
    debouncedLoadMore,
  ]);

  if (staffLoading) {
    return <StaffSkeleton />;
  }

  if (!staffLoading && (!staff || staff.length === 0)) {
    return <EmptyState />;
  }

  const displayItems = renderList.slice(0, displayCount);

  return (
    <>
      <motion.div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 items-start">
        {displayItems.map((item, idx) => {
          const currentBatchIndex = idx % ITEMS_PER_BATCH;

          //
          const isLastItem = idx === displayItems.length - 1;

          if (item.type === 'header') {
            return (
              <motion.div
                key={`header-${item.label}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full mt-8 mb-2">
                <div className="flex items-center gap-4">
                  <h3 className="text-lg font-bold text-white whitespace-nowrap drop-shadow-[0_0_3px_rgba(255,255,255,0.3)]">
                    {item.label}
                  </h3>
                  <div className="h-px w-full bg-white/10" />
                </div>
              </motion.div>
            );
          }

          const { data: member, pos } = item;
          return (
            <motion.div
              key={`${pos}-${member.person.mal_id}-${idx}`}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              custom={currentBatchIndex}
              onAnimationComplete={() => {
                if (isLastItem) {
                  setIsAnimating(false);
                }
              }}
              className="group flex gap-5 p-4 bg-zinc-900/30 border border-white/5 rounded-2xl">
              <div className="relative shrink-0">
                <div className="w-12 h-16 lg:w-14 lg:h-20 overflow-hidden bg-zinc-800 rounded-sm  ">
                  <MotionImage
                    src={member.person.images.jpg.image_url}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="flex flex-col justify-center min-w-0 flex-1">
                <h4 className="text-zinc-100 font-bold truncate">
                  {member.person.name}
                </h4>
                <p className="text-xs text-zinc-500 mt-1 italic">
                  {member.positions.join(', ')}
                </p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
      {/* for trigger load */}
      {displayCount < renderList.length && (
        <div
          ref={loadMoreRef}
          className="col-span-full h-32 flex items-center justify-center">
          {(isInternalLoading || isAnimating || inView) && (
            <div className="text-zinc-500 text-xs">Loading Staff...</div>
          )}
        </div>
      )}
    </>
  );
};

const StaffSkeleton = () => (
  <section className=" animate-pulse">
    <header className="flex flex-col mt-6 lg:flex-row lg:mt-0 items-center justify-between mb-8">
      <div className="h-8 w-48 bg-zinc-800 rounded-md" />
    </header>

    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 items-start">
      {[1, 2].map((group) => (
        <React.Fragment key={group}>
          <div className="col-span-full mt-8 mb-2 flex items-center gap-4">
            <div className="h-6 w-32 bg-zinc-800 rounded" />
            <div className="h-px w-full bg-white/5" />
          </div>

          {Array.from({ length: group === 1 ? 3 : 6 }).map((_, i) => (
            <div
              key={i}
              className="flex gap-5 p-4 bg-zinc-900/20 border border-white/5 rounded-2xl">
              {/* Avatar Skeleton */}
              <div className="shrink-0">
                <div className="w-12 h-16 lg:w-14 lg:h-20 bg-zinc-800 rounded-sm" />
              </div>

              {/* Info Skeleton */}
              <div className="flex flex-col justify-center gap-2 flex-1">
                <div className="h-4 w-3/4 bg-zinc-800 rounded" />
                <div className="h-3 w-1/2 bg-zinc-800/50 rounded italic" />
              </div>
            </div>
          ))}
        </React.Fragment>
      ))}
    </div>
  </section>
);

const EmptyState = () => {
  return (
    <div className="mt-12 p-12 bg-white/2 rounded-3xl border border-dashed border-white/10 flex flex-col items-center justify-center gap-3">
      <UserPen className="w-8 h-8 text-white/20" />
      <p className="text-zinc-500 text-sm md:text-base font-medium">
        No production staff information found.
      </p>
    </div>
  );
};

export default AnimeDetailStaff;
