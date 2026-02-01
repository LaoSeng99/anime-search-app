import { FileImage } from 'lucide-react';

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
        <FileImage className="w-12 h-12 text-gray-700"></FileImage>
      </div>
    </div>
  );
};

export default AnimeCardSkeleton;
