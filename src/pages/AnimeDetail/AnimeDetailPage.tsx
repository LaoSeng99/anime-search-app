import { Outlet, useLocation, useNavigate, useParams } from 'react-router';

import { useQuery } from '@tanstack/react-query';
import { getAnimeById } from '../../services/animeService';
import {
  GitBranch,
  Info,
  PlayCircle,
  SearchX,
  UserRoundPen,
  Users,
  Youtube,
} from 'lucide-react';
import { useEffect } from 'react';
import MotionImage from '../../components/ui/MotionImage';
import FavouriteButton from '../../components/ui/FavouriteButton';
import { getLastSegment, getYoutubeVideoUrl } from '../../utils/urlHelper';
import { useBackgroundStore } from '../../hooks/useBackgroundStore';
import NavigationTab, { type NavTab } from '../../components/ui/NavigationTab';
import ErrorState from '../../components/ui/ErrorState';

const AnimeDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { setBackground, clearBackground } = useBackgroundStore();

  const {
    data: anime,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['anime', id],
    queryFn: async () => {
      const data = await getAnimeById(id!);
      return data.data;
    },
  });

  useEffect(() => {
    if (anime) {
      setBackground({
        embedUrl: anime.trailer?.embed_url ?? '',
        backdropUrl: anime.images?.webp?.large_image_url,
        isLoop: true,
      });
    }

    return () => clearBackground();
  }, [anime, setBackground, clearBackground]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) {
    return <DetailHeaderSkeleton />;
  }
  if (error || !anime) {
    return (
      <ErrorState
        icon={<SearchX />}
        showHomeButton
        title="Failed to retrieve anime data"
        message="Retry or Back to home"
        onRetry={refetch}
      />
    );
  }

  return (
    <section className="relative z-10 w-full min-h-screen text-white">
      <div
        aria-label="video-placeholder"
        className="w-full aspect-video pointer-events-none"
      />

      <div className="sm:-mt-[30vw] md:-mt-[5vw] lg:-mt-[25vw] xl:-mt-[30vw] relative z-30">
        <div
          aria-label="Header section"
          className="px-6 md:px-16 flex flex-col md:flex-row gap-8 items-start relative">
          <div
            aria-label="header-shadow"
            className="absolute inset-0 -z-1 bg-linear-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent"
          />
          {/* Anime Poster */}
          <div className="shrink-0 w-44 md:w-64 shadow-[0_20px_50px_rgba(0,0,0,0.8)] rounded-xl overflow-hidden border border-white/20 bg-[#1a1a1a] z-30">
            <MotionImage
              className="w-full h-full object-cover"
              src={anime.images?.webp.large_image_url}
              alt={`${anime.title} poster`}
            />
          </div>

          {/* Title & Actions */}
          <div className=" grow pb-6 space-y-4">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex flex-col gap-6">
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-2">
                  {anime.title}
                </h1>
                <div className="flex items-center gap-4 text-sm font-medium">
                  <div className="flex items-center gap-1.5 bg-yellow-500/10 text-yellow-500 px-2 py-1 rounded">
                    <span className="text-xs">★</span>
                    <span className="leading-none">{anime.score || 'N/A'}</span>
                  </div>
                  <span className="text-gray-400">|</span>
                  <span className="text-gray-300">
                    {anime.year || anime.season || 'TBA'}
                  </span>
                  <span className="text-gray-400">|</span>
                  <span className="text-gray-300 uppercase">
                    {anime.rating?.split(' ')[0] || 'PG-13'}
                  </span>
                </div>
                <FavouriteButton anime={anime} />
              </div>

              <div className="flex items-center gap-3">
                {anime.trailer?.embed_url && (
                  <a
                    href={getYoutubeVideoUrl(anime.trailer.embed_url)}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 px-5 py-2.5 rounded-xl whitespace-nowrap
                             bg-black/40 backdrop-blur-md border border-white/10 text-white
                             hover:bg-black/60 hover:border-white/40 shadow-2xl  shadow-white/10
                               transition-all duration-300 active:scale-95 group">
                    <Youtube
                      size={20}
                      className="shrink-0 transition-transform duration-300 group-hover:scale-110"
                      color="#FF0000"
                    />

                    <span className="font-bold tracking-wide">
                      Watch Trailer
                    </span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        <div
          aria-label="Anime detail section"
          className="relative z-20 px-6 md:px-16 pt-4 bg-[#0a0a0a] rounded-b-xl pb-8">
          <NavTabSection />
          {/* 4. Details & Description Grid */}
          <Outlet context={{ anime, isLoading }} />
        </div>
      </div>
    </section>
  );
};

const NavTabSection = () => {
  const tabs: NavTab[] = [
    {
      id: 'overview',
      label: 'Overview',
      icon: <Info size={18} />,
    },
    {
      id: 'relations',
      label: 'Relations',
      icon: <GitBranch size={18} />,
    },
    {
      id: 'staff',
      label: 'Staff',
      icon: <UserRoundPen size={18} />,
    },
    {
      id: 'characters',
      label: 'Characters',
      icon: <Users size={18} />,
    },

    {
      id: 'episodes',
      label: 'Episodes',
      icon: <PlayCircle size={18} />,
    },
  ];
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleTabChange = (tab: NavTab) => {
    navigate(tab.id);
  };
  return (
    <NavigationTab
      tabs={tabs}
      initialTab={getLastSegment(pathname)}
      onChange={handleTabChange}
      enableKeyboardControl
    />
  );
};

const DetailHeaderSkeleton = () => (
  <section className="relative w-full min-h-screen text-white animate-pulse">
    {/* Video Area Placeholder */}
    <div className="w-full aspect-video bg-zinc-900/50" />

    <div className="sm:-mt-[30vw] md:-mt-[5vw] lg:-mt-[25vw] xl:-mt-[30vw] relative z-30 px-6 md:px-16">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Poster Skeleton */}
        <div className="shrink-0 w-44 md:w-64 aspect-3/4 bg-zinc-800 rounded-xl border border-white/10" />

        {/* Info Skeleton */}
        <div className="grow space-y-6 pt-4">
          <div className="h-12 w-3/4 bg-zinc-800 rounded-lg" />
          <div className="flex gap-4">
            <div className="h-6 w-20 bg-zinc-800 rounded" />
            <div className="h-6 w-20 bg-zinc-800 rounded" />
          </div>
          <div className="h-10 w-32 bg-zinc-800 rounded-lg" />
        </div>
      </div>

      {/* Tabs Skeleton */}
      <div className="mt-12 flex gap-8 border-b border-white/5 pb-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-4 w-16 bg-zinc-800 rounded" />
        ))}
      </div>
    </div>
  </section>
);

export default AnimeDetailPage;
