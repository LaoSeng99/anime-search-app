import { useOutletContext } from 'react-router';
import type { Anime } from '../../../types/anime';
import { cleanSynopsis } from '../../../utils/labelHelper';

const AnimeDetailOverview = () => {
  const { anime, isLoading } = useOutletContext<{
    anime: Anime;
    isLoading: boolean;
  }>();

  if (isLoading || !anime) {
    return <OverviewSkeleton />;
  }

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8 lg:gap-16 mt-8 lg:mt-12">
        {/* Sidebar: Details & Links */}
        <aside
          className="space-y-6"
          aria-label="Anime metadata and external links">
          <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
            <h3 className="text-lg font-bold mb-6 text-white/90">Details</h3>
            <dl className="space-y-5 text-sm">
              <DetailItem label="Format" value={anime.type} />
              <DetailItem label="Episodes" value={anime.episodes} />
              <DetailItem label="Status" value={anime.status} />
              <DetailItem label="Aired" value={anime.aired?.string} />
              <DetailItem
                label="Season"
                value={
                  anime.season && anime.year
                    ? `${anime.season} ${anime.year}`
                    : 'N/A'
                }
              />
              <DetailItem
                label="Studios"
                value={anime.studios?.map((s) => s.name).join(', ')}
              />
              <DetailItem
                label="Genres"
                value={anime.genres?.map((g) => g.name).join(', ')}
              />
              <DetailItem label="Rating" value={anime.rating} />
              <DetailItem label="Duration" value={anime.duration} />
            </dl>
          </div>

          {/* External Links Section */}
          {anime.external && anime.external.length > 0 && (
            <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
              <h3 className="text-sm font-bold uppercase tracking-wider text-white/40 mb-4">
                External Links
              </h3>
              <div className="flex flex-col gap-3">
                {anime.external.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-2"
                    aria-label={`Visit ${link.name}`}>
                    <span className="truncate">{link.name}</span>
                    <svg
                      className="w-3 h-3 shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          )}
        </aside>

        {/* Main Content: Synopsis & Background */}
        <article className="max-w-4xl space-y-10">
          <section aria-labelledby="synopsis-title">
            <h2
              id="synopsis-title"
              className="text-2xl font-bold mb-6 text-white">
              Synopsis
            </h2>
            <div className="text-gray-300 leading-relaxed text-lg space-y-6">
              {anime.synopsis ? (
                cleanSynopsis(anime.synopsis)
                  .split('\n')
                  .map((para, i) => <p key={i}>{para}</p>)
              ) : (
                <p className="italic text-gray-500">
                  No description available.
                </p>
              )}
            </div>
          </section>

          {anime.background && (
            <section aria-labelledby="background-title">
              <h3
                id="background-title"
                className="text-xl font-bold mb-4 text-white/80">
                Background
              </h3>
              <div className="text-gray-400 leading-relaxed text-md bg-white/5 p-6 rounded-xl border-l-4 border-gray-100/50">
                {anime.background}
              </div>
            </section>
          )}

          {/* Themes / Tags */}
          {anime.themes && anime.themes.length > 0 && (
            <section aria-label="Anime themes">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                Themes
              </h3>
              <div className="flex flex-wrap gap-2">
                {anime.themes.map((theme) => (
                  <span
                    key={theme.mal_id}
                    className="px-4 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full text-sm text-blue-300 hover:bg-blue-500/20 transition-colors cursor-default">
                    {theme.name}
                  </span>
                ))}
              </div>
            </section>
          )}
        </article>
      </div>
    </>
  );
};
export default AnimeDetailOverview;

const OverviewSkeleton = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8 lg:gap-16 mt-8 lg:mt-12 pb-24 animate-pulse">
      {/* Sidebar Skeleton */}
      <aside className="space-y-6">
        <div className="bg-white/5 p-6 rounded-2xl border border-white/5 space-y-6">
          <div className="h-6 w-24 bg-zinc-800 rounded mb-6" />
          {Array.from({ length: 9 }).map((_, i) => (
            <div
              key={i}
              className="flex flex-col md:flex-row md:justify-between gap-2">
              <div className="h-4 w-16 bg-zinc-800 rounded" />
              <div className="h-4 w-24 bg-zinc-800/50 rounded" />
            </div>
          ))}
        </div>
        <div className="p-6 bg-white/5 rounded-2xl border border-white/5 space-y-4">
          <div className="h-3 w-28 bg-zinc-800 rounded" />
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-4 w-full bg-zinc-800/50 rounded" />
            ))}
          </div>
        </div>
      </aside>

      {/* Main Content Skeleton */}
      <article className="max-w-4xl space-y-10">
        <section>
          <div className="h-8 w-32 bg-zinc-800 rounded mb-6" />
          <div className="space-y-4">
            <div className="h-4 w-full bg-zinc-800/50 rounded" />
            <div className="h-4 w-full bg-zinc-800/50 rounded" />
            <div className="h-4 w-3/4 bg-zinc-800/50 rounded" />
          </div>
        </section>
        <section>
          <div className="h-6 w-28 bg-zinc-800 rounded mb-4" />
          <div className="h-24 w-full bg-white/5 rounded-xl border-l-4 border-zinc-800" />
        </section>
      </article>
    </div>
  );
};

const DetailItem = ({
  label,
  value,
}: {
  label: string;
  value: string | number | null;
}) => (
  <div className="flex flex-col md:flex-row md:justify-between gap-2">
    <dt className="text-gray-400 font-medium flex-1/12">{label}</dt>
    <dd className="text-white text-start flex-3">{value || 'Unknown'}</dd>
  </div>
);
