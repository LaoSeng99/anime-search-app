const TrailerVideo = () => {
  return (
    <div className="absolute inset-0 z-0">
      <iframe
        className="w-full h-full scale-[1.2] pointer-events-none"
        src="https://www.youtube.com/embed/B1gDCOTpDzA?autoplay=1&mute=0&controls=0&loop=1&playlist=B1gDCOTpDzA&rel=0&showinfo=0&iv_load_policy=3"
        title="Trailer"></iframe>

      <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/20 to-transparent z-10"></div>
    </div>
  );
};

export default TrailerVideo;
