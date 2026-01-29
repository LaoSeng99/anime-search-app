const TrailerVideo = () => {
  const youtubeConfig =
    '?autoplay=1&mute=1&controls=0&loop=1&playlist=B1gDCOTpDzA&rel=0&showinfo=0&iv_load_policy=3';
  return (
    <div className="absolute inset-0 z-0">
      <iframe
        className="w-full h-full scale-[1.2] pointer-events-none"
        loading="lazy"
        src={'https://www.youtube.com/embed/B1gDCOTpDzA' + youtubeConfig}
        title="Trailer"
        allow="autoplay; encrypted-media"></iframe>

      <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/20 to-transparent z-10"></div>
    </div>
  );
};

export default TrailerVideo;
