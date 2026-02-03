import { useOutletContext } from 'react-router';
import type { Anime } from '../../../types/anime';
import { motion } from 'framer-motion';
import { User, ChevronRight, Mic2, Users } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import MotionImage from '../../../components/ui/MotionImage';
import { getAnimeCharacters } from '../../../services/animeService';
import PaginationGroup from '../../../components/ui/PaginationGroup';
import { useMemo } from 'react';
import { useUrlQueryState } from '../../../hooks/useUrlQueryState';
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

const AnimeDetailCharacters = () => {
  const PER_PAGE = 10;
  const { anime, isLoading } = useOutletContext<{
    anime: Anime;
    isLoading: boolean;
  }>();

  const {
    data: characters,
    error,
    isLoading: characterLoading,
  } = useQuery({
    queryKey: ['anime', anime.mal_id, 'characters'],
    queryFn: async () => {
      const data = await getAnimeCharacters(anime.mal_id);
      return data.data;
    },
    enabled: !isLoading,
  });

  const { urlRequest } = useUrlQueryState();

  const displayCharacters = useMemo(() => {
    if (!characters) return [];

    const currentPage = urlRequest.page ?? 1;
    const start = (currentPage - 1) * PER_PAGE;
    const end = start + PER_PAGE;

    return characters.slice(start, end);
  }, [urlRequest.page, characters]);

  if (!characterLoading && (!characters || characters.length === 0)) {
    return (
      <EmptyState message="No characters found for this anime." icon={Users} />
    );
  }

  return (
    <>
      <div className="flex flex-col mt-6 lg:flex-row lg:mt-0 items-center justify-between ">
        <h2 className="text-2xl font-bold text-white tracking-tight">
          Character List
        </h2>
        <PaginationGroup
          itemLength={characters?.length || 0}
          currentPage={urlRequest.page ?? 1}
          perPage={PER_PAGE}
          isLoading={isLoading}></PaginationGroup>
      </div>
      <motion.div
        key={`${urlRequest.page}-${characterLoading}`}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className=" pb-24 grid grid-cols-1 lg:grid-cols-2  xl:grid-cols-3 gap-4 lg:gap-6">
        {characterLoading ? (
          <CharacterSkeleton />
        ) : (
          displayCharacters?.map((item) => (
            <motion.div
              key={item.character.mal_id}
              variants={itemVariants}
              className="group flex items-center justify-between bg-zinc-900/50 hover:bg-zinc-800/50 border border-white/5 rounded-xl overflow-hidden transition-colors duration-300"
              aria-label={`Character ${item.character.name} voiced by ${item.voice_actors[0]?.person.name || 'Unknown'}`}>
              {/* Left: Character Info */}
              <div className="flex items-center gap-4 flex-1 min-w-0">
                <div className="relative min-w-16  h-20 lg:min-w-20 lg:h-24 overflow-hidden bg-zinc-800">
                  <MotionImage
                    src={item.character.images.jpg.image_url}
                    alt={item.character.name}
                    className="w-full h-full object-cover transition-transform duration-500"
                  />
                </div>

                <div className="flex flex-col py-2 truncate">
                  <span className="text-zinc-100 font-semibold truncate">
                    {item.character.name}
                  </span>
                  <span className="text-zinc-400 text-sm mt-1 flex items-center gap-1 uppercase tracking-wider">
                    <User size={12} /> {item.role}
                  </span>
                </div>
              </div>

              {/* Center: Decorative Arrow (Desktop) */}
              <div className="hidden md:block text-zinc-800 group-hover:text-zinc-600 transition-colors">
                <ChevronRight size={20} />
              </div>

              {/* Right: Voice Actor (Japanese default) */}
              <div className="flex items-center text-right gap-4 flex-1 justify-end min-w-0 pr-4">
                <div className="flex flex-col py-2 truncate">
                  {item.voice_actors.find(
                    (va) => va.language === 'Japanese',
                  ) ? (
                    <>
                      <span className="text-zinc-200 text-md truncate">
                        {
                          item.voice_actors.find(
                            (va) => va.language === 'Japanese',
                          )?.person.name
                        }
                      </span>
                      <span className="text-zinc-500 text-sm mt-1 flex items-center justify-end gap-1 uppercase">
                        Japanese <Mic2 size={12} />
                      </span>
                    </>
                  ) : (
                    <span className="text-zinc-500 text-sm italic">
                      No VA data
                    </span>
                  )}
                </div>
                <div className="relative w-12 h-16 lg:w-14 lg:h-20 overflow-hidden bg-zinc-800 rounded-sm">
                  <MotionImage
                    src={
                      item.voice_actors.find((va) => va.language === 'Japanese')
                        ?.person.images.jpg.image_url
                    }
                    alt="Voice Actor"
                    className="w-full h-full object-cover transition-all duration-500"
                  />
                </div>
              </div>
            </motion.div>
          ))
        )}
      </motion.div>
    </>
  );
};

const CharacterSkeleton = () => {
  const skeletonItems = Array.from({ length: 10 });
  return skeletonItems.map((_, index) => {
    return (
      <div
        key={`skeleton-${index}`}
        className="flex items-center justify-between bg-zinc-900/30 border border-white/5 rounded-xl overflow-hidden animate-pulse">
        {/* Left: Character Info Skeleton */}
        <div className="flex items-center gap-4 flex-1">
          <div className="min-w-16 h-20 lg:min-w-20 lg:h-24 bg-zinc-800" />
          <div className="flex flex-col gap-2">
            <div className="h-4 w-24 bg-zinc-800 rounded" />
            <div className="h-3 w-16 bg-zinc-800/50 rounded" />
          </div>
        </div>

        {/* Center: Arrow Skeleton (Desktop) */}
        <div className="hidden md:block px-4">
          <div className="h-5 w-5 bg-zinc-800 rounded-full" />
        </div>

        {/* Right: VA Info Skeleton */}
        <div className="flex items-center gap-4 flex-1 justify-end pr-4">
          <div className="flex flex-col items-end gap-2">
            <div className="h-4 w-20 bg-zinc-800 rounded" />
            <div className="h-3 w-12 bg-zinc-800/50 rounded" />
          </div>
          <div className="w-12 h-16 lg:w-14 lg:h-20 bg-zinc-800 rounded-sm" />
        </div>
      </div>
    );
  });
};

export default AnimeDetailCharacters;
