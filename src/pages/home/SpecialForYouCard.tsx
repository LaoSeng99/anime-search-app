import { useQuery } from '@tanstack/react-query';
import { getAnime } from '../../services/animeService';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import AnimeCardSkeleton from '../../components/AnimePosterCardSkeleton';
import AnimePosterCard from '../../components/AnimePosterCard';

const SpecialForYouCard = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['anime-special'],
    queryFn: async () => {
      const data = await getAnime({ limit: 10, page: 1 });
      return data;
    },
  });

  const carouselRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  const skeletonNodes = [...Array(6)].map((_, i) => (
    <AnimeCardSkeleton key={i} />
  ));

  const posterCardNodes = data?.data.map((anime) => (
    <AnimePosterCard key={anime.mal_id} anime={anime} />
  ));

  useEffect(() => {
    if (carouselRef.current) {
      setWidth(
        carouselRef.current.scrollWidth - carouselRef.current.offsetWidth,
      );
    }
  }, [data, isLoading]);

  return (
    <div className="relative z-20 text-white -translate-y-40  overflow-hidden">
      <h2 className="text-2xl font-medium text-white  px-8 md:px-16 pb-4">
        Special for you
      </h2>
      <div className="flex flex-row overflow-x-auto snap-x">
        <div className="overflow-hidden w-full">
          {/* horizontal carousel */}
          <motion.div
            ref={carouselRef}
            className="cursor-grab active:cursor-grabbing">
            <motion.div
              drag="x"
              dragConstraints={{ right: 0, left: -width }}
              className="flex gap-6  px-8 md:px-16">
              {isLoading ? skeletonNodes : posterCardNodes}
              <div className="min-w-10 h-1" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SpecialForYouCard;
