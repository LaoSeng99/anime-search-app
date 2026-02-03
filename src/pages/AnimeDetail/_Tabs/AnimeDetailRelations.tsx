import { Link, useOutletContext } from 'react-router';
import type { Anime, RelationEntry } from '../../../types/anime';
import { motion } from 'framer-motion';
import { ArrowRight, Layers } from 'lucide-react';
import EmptyState from '../../../components/ui/EmptyState';
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};
const AnimeDetailRelations = () => {
  const { anime, isLoading } = useOutletContext<{
    anime: Anime;
    isLoading: boolean;
  }>();

  if (isLoading) return <RelationSkeleton />;

  if (!anime.relations || anime.relations.length === 0) {
    return <EmptyState message="No related content available." icon={Layers} />;
  }

  return (
    <>
      <div className="mt-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-10">
          {anime.relations.map((rel, index) => (
            <section
              key={`${rel.relation}-${index}`}
              aria-labelledby={`relation-type-${index}`}
              className="group">
              {/* Relation Type Header */}
              <div className="flex items-center gap-4 mb-5">
                <h3
                  id={`relation-type-${index}`}
                  className="text-[11px] md:text-xs font-black uppercase tracking-[0.2em] text-white/90 bg-white/10 px-2.5 py-1 rounded-sm">
                  {rel.relation}
                </h3>
                <div className="h-px flex-1 bg-white/10 group-hover:bg-white/20 transition-colors" />
              </div>

              {/* Entry Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {rel.entry.map((item) => (
                  <RelationCard key={item.mal_id} item={item} />
                ))}
              </div>
            </section>
          ))}
        </motion.div>
      </div>
    </>
  );
};

const RelationSkeleton = () => {
  return (
    <div className="mt-8 lg:mt-16 pb-24 max-w-5xl animate-pulse">
      <div className="flex flex-col gap-10">
        {[1, 2, 3].map((section) => (
          <div key={section} className="group">
            {/* Relation Type Header Skeleton */}
            <div className="flex items-center gap-4 mb-5">
              <div className="h-6 w-20 bg-zinc-800 rounded-sm" />
              <div className="h-px flex-1 bg-white/5" />
            </div>

            {/* Entry Grid Skeleton */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[1, 2].map((card) => (
                <div
                  key={card}
                  className="h-[76px] p-4 bg-white/3 border border-white/5 rounded-xl flex flex-col justify-center gap-2">
                  <div className="h-4 w-3/4 bg-zinc-800 rounded" />
                  <div className="h-3 w-12 bg-zinc-800/50 rounded" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const RelationCard = ({ item }: { item: RelationEntry }) => {
  const isManga = item.type === 'manga';

  return (
    <motion.div variants={itemVariants}>
      <Link
        to={isManga ? `/manga/${item.mal_id}` : `/anime/${item.mal_id}`}
        className="flex items-center justify-between p-4 bg-white/3 hover:bg-white/8 border border-white/5 rounded-xl transition-all duration-300 group/card relative overflow-hidden">
        <div className="flex flex-col gap-1.5 min-w-0 z-10">
          <span className="text-sm md:text-base text-zinc-200 font-semibold truncate group-hover/card:text-white transition-colors">
            {item.name}
          </span>
          <div className="flex items-center gap-2">
            <span className="text-[10px] md:text-xs font-bold text-zinc-500 tracking-wider uppercase flex items-center gap-1.5">
              <span
                className={`w-1.5 h-1.5 rounded-full ${isManga ? 'bg-zinc-400' : 'bg-white/40'}`}
              />
              {item.type}
            </span>
          </div>
        </div>

        <div className="ml-4 transform translate-x-2 opacity-0 group-hover/card:translate-x-0 group-hover/card:opacity-100 transition-all duration-300">
          <ArrowRight className="w-4 h-4 text-white" />
        </div>
      </Link>
    </motion.div>
  );
};

export default AnimeDetailRelations;
