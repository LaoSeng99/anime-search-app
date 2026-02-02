import { useState } from 'react';
import ReactPlayer from 'react-player';
import { getYoutubeIdFromUrl } from '../utils/urlHelper';
import MotionImage from './ui/MotionImage';
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
    if (hasError || embedUrl === '') {
      return (
        <div className="absolute inset-0 z-0">
          <MotionImage
            src={backdropUrl}
            className="w-full h-full object-cover blur-1xl scale-110 opacity-60"
            alt="Anime poster"
          />
        </div>
      );
    }

    return (
      <div className="absolute inset-0 z-0">
        <ReactPlayer
          width={'100%'}
          height={'100%'}
          style={{
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
          }}
          autoPlay={true}
          muted={true}
          controls={false}
          onEnded={onVideoEnd}
          onError={() => setHasError(true)}
          src={finalVideoUrl}
          loop={loop}
        />

        <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/20 to-transparent z-10"></div>
      </div>
    );
  };

  return renderContent();
};

export default TrailerVideo;
