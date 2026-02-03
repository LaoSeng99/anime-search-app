import { useState } from 'react';
import ReactPlayer from 'react-player';
import { getYoutubeIdFromUrl } from '../utils/urlHelper';
import MotionImage from './ui/MotionImage';
import { cn } from '../utils/ui.util';
interface TrailerVideoProps {
  embedUrl: string;
  backdropUrl: string;
  onVideoEnd?: () => void;
  loop?: boolean;
}

const TrailerVideo = ({
  embedUrl,
  backdropUrl,
  onVideoEnd,
  loop = false,
}: TrailerVideoProps) => {
  const [hasError, setHasError] = useState(false);

  const noCookieUrl = 'https://www.youtube-nocookie.com/embed/';
  const youtubeId = getYoutubeIdFromUrl(embedUrl);
  const finalVideoUrl = `${noCookieUrl}${youtubeId}?enablejsapi=1&origin=${window.location.origin}`;
  const renderContent = () => {
    return (
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <MotionImage
          src={backdropUrl}
          className={cn(
            'w-full h-full object-cover',
            !hasError && embedUrl !== ''
              ? 'md:blur-xl md:scale-110 md:opacity-60'
              : '-translate-y-20 md:translate-y-0 opacity-100',
          )}
          alt="Anime poster"
        />

        {!hasError && embedUrl !== '' && (
          <div className="hidden md:block absolute inset-0">
            <ReactPlayer
              src={finalVideoUrl}
              width="100%"
              height="100%"
              playing
              muted
              controls={false}
              onEnded={onVideoEnd}
              onError={() => setHasError(true)}
              loop={loop}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                objectFit: 'cover',
              }}
            />
          </div>
        )}
      </div>
    );
  };
  return renderContent();
};

export default TrailerVideo;
