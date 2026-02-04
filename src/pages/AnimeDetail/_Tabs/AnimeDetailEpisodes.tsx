import React from 'react';
import { useOutletContext } from 'react-router';
import type { Anime } from '../../../types/anime';
import { useQuery } from '@tanstack/react-query';
import { getAnimeVideoEpisodes } from '../../../services/animeService';
import { motion } from 'framer-motion';
import { PlayCircle, ImageIcon } from 'lucide-react';
import { useUrlQueryState } from '../../../hooks/useUrlQueryState';
import PaginationGroup from '../../../components/ui/PaginationGroup';
import EmptyState from '../../../components/ui/EmptyState';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.03 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0 },
};

const AnimeDetailEpisodes: React.FC = () => {
  const { anime } = useOutletContext<{
    anime: Anime;
  }>();

  const { urlRequest } = useUrlQueryState();
  const { data, isLoading } = useQuery({
    queryKey: ['anime', anime.mal_id, 'episodes', urlRequest.page ?? 1],
    queryFn: async () => {
      const data = await getAnimeVideoEpisodes(
        anime.mal_id,
        urlRequest.page ?? 1,
      );
      return data;
    },
    enabled: !!anime?.mal_id,
  });

  const episodes = data?.data;
  const pagination = data?.pagination;

  if (!isLoading && (!episodes || episodes.length === 0)) {
    return (
      <EmptyState
        message="No episodes information available."
        icon={PlayCircle}
      />
    );
  }

  return (
    <>
      <div className="flex flex-col mt-6 lg:flex-row lg:mt-0 items-center justify-between">
        <h2 className="flex-1 text-2xl font-bold text-white tracking-tight">
          Episode List
        </h2>
        <div className="flex-1">
          <PaginationGroup
            showFirstLastPageNumber
            totalPage={pagination?.last_visible_page}
            currentPage={urlRequest.page ?? 1}
            siblingCount={2}
            isLoading={isLoading}></PaginationGroup>
        </div>
      </div>
      <motion.div
        key={`${urlRequest.page}-${isLoading}`}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 2xl:grid-cols-2 gap-6">
        {isLoading ? (
          <AnimeEpisodesSkeleton />
        ) : (
          episodes?.map((ep) => (
            <motion.a
              key={ep.mal_id}
              href={ep.url}
              target="_blank"
              rel="noopener noreferrer"
              variants={itemVariants}
              className="group relative flex flex-col sm:flex-row bg-zinc-900/40 hover:bg-zinc-800/80 border border-white/5 rounded-xl overflow-hidden transition-all duration-300 ring-1 ring-transparent hover:ring-white/20">
              {/* Left: Thumbnail Section */}
              <div className="relative w-full sm:w-72 aspect-video shrink-0 overflow-hidden bg-zinc-950">
                {ep.images?.jpg?.image_url ? (
                  <img
                    src={ep.images.jpg.image_url}
                    alt={ep.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ImageIcon className="text-zinc-700" size={32} />
                  </div>
                )}

                {/* Play Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="p-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                    <PlayCircle className="text-white w-8 h-8" />
                  </div>
                </div>

                {/* Episode Label */}
                <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/80 backdrop-blur-md border border-white/10 rounded text-[10px] font-bold text-white uppercase tracking-wider">
                  {ep.episode}
                </div>
              </div>

              {/* Right: Info Section */}
              <div className="flex flex-col p-5 flex-1 min-w-0">
                <div className="flex-1">
                  <h4 className="text-zinc-100 font-semibold text-lg line-clamp-1 group-hover:text-white transition-colors">
                    {ep.title}
                  </h4>
                  <p className="text-zinc-500 text-sm mt-2 line-clamp-2 leading-relaxed">
                    Watch {ep.title} ({ep.episode}) from {anime.title}. Explore
                    the full details and media on the official portal.
                  </p>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-3">
                  <span className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em]">
                    Source: MAL
                  </span>
                  <span className="text-xs font-bold text-zinc-400 group-hover:text-white transition-colors flex items-center gap-1">
                    WATCH NOW <PlayCircle size={12} />
                  </span>
                </div>
              </div>
            </motion.a>
          ))
        )}
      </motion.div>
    </>
  );
};

const AnimeEpisodesSkeleton = () => {
  const skeletonItems = Array.from({ length: 8 });

  return (
    <>
      {skeletonItems.map((_, index) => (
        <div
          key={index}
          className="flex flex-col sm:flex-row bg-zinc-900/20 border border-white/5 rounded-xl overflow-hidden">
          {/* Left: Image Placeholder */}
          <div className="w-full sm:w-72 aspect-video shrink-0 bg-zinc-800 animate-pulse" />

          {/* Right: Info Placeholder */}
          <div className="flex flex-col p-5 flex-1 space-y-4">
            <div className="space-y-2">
              {/* Title line */}
              <div className="h-5 w-3/4 bg-zinc-800 rounded animate-pulse" />
              {/* Description lines */}
              <div className="h-3 w-full bg-zinc-800/60 rounded animate-pulse" />
              <div className="h-3 w-5/6 bg-zinc-800/60 rounded animate-pulse" />
            </div>

            {/* Bottom bar */}
            <div className="mt-auto pt-3 border-t border-white/5 flex justify-between items-center">
              <div className="h-2 w-16 bg-zinc-800 rounded animate-pulse" />
              <div className="h-3 w-24 bg-zinc-800 rounded animate-pulse" />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnimeDetailEpisodes;
