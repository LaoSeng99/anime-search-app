const AnimeCardSkeleton = ({
  className = 'w-64 max-w-80',
}: {
  className?: string;
}) => {
  return (
    <div
      className={`relative ${className} min-w-[16rem] h-96 rounded-2xl bg-gray-800 animate-pulse flex flex-col justify-end p-4`}>
      <div className="h-6 bg-gray-700 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-700 rounded w-1/2"></div>

      <div className="absolute inset-0 flex items-center justify-center">
        <svg
          className="w-12 h-12 text-gray-700"
          fill="currentColor"
          viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
};

export default AnimeCardSkeleton;
