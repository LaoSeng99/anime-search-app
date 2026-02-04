import SocialLink from './SocialLink';

const Footer = () => {
  const socialLinks = [
    {
      href: 'https://github.com/LaoSeng99',
      src: '/github.svg',
      alt: 'github repositories',
      shadowColor: 'group-hover:drop-shadow-[0_6px_10px_rgba(255,255,255,0.8)]',
      className: 'w-8 invert-[0.5] group-hover:invert-100 shrink-0',
    },
    {
      href: 'https://my.jobstreet.com/profiles/sen-hong-WzBNfx9w2p',
      src: '/jobstreet.png',
      alt: 'jobstreet',
      shadowColor: 'group-hover:drop-shadow-[0_6px_10px_rgba(238,30,45,0.7)]',
      className:
        'w-11 grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 shrink-0',
    },
    {
      href: 'https://www.linkedin.com/in/ong-sen-hong-a36850139/',
      src: '/linkedin.png',
      alt: 'linkedin',
      shadowColor: 'group-hover:drop-shadow-[0_6px_10px_rgba(10,102,194,0.7)]',
      className: 'w-7.5 grayscale group-hover:grayscale-0 shrink-0',
    },
  ];

  return (
    <footer className="w-full flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 px-4 py-6 md:py-4 bg-black border-t border-white/10 text-center">
      {/* External Links Section */}
      <div className="flex items-center justify-center gap-4">
        {socialLinks.map((item, index) => (
          <SocialLink
            key={index}
            href={item.href}
            src={item.src}
            alt={item.alt}
            shadowColor={item.shadowColor}
            className={item.className}></SocialLink>
        ))}
      </div>

      {/* Open Source Section */}
      <p className="text-[10px] md:text-[11px] text-zinc-500 tracking-wider uppercase">
        Code is{' '}
        <a
          href="https://github.com/LaoSeng99/anime-search-app"
          target="_blank"
          className="text-zinc-300 hover:text-white transition-colors border-b border-zinc-700 hover:border-white">
          Open Source
        </a>
      </p>
      {/* Copyright Section */}
      <p
        className="font-sans text-[0.7rem] md:text-[0.85rem] text-gray-400 tracking-widest uppercase transition-all duration-700 
                    cursor-default hover:text-gray-50 hover:-translate-y-0.5 max-w-70 md:max-w-none">
        <span className="font-bold ml-1 text-gray-200">LAOSENG</span> ©{' '}
        <span className="tabular-nums">{new Date().getFullYear()}</span>
        <span className="mx-2 opacity-50">|</span>
        FOR DEMONSTRATION PURPOSES ONLY
      </p>
      {/* UI Credit */}
      <p className="text-[10px] text-gray-400 tracking-[0.2em] uppercase transition-all duration-300">
        UI Inspired by{' '}
        <a
          href="https://dribbble.com/shots/22982773-Kurosaw-Anime-Streaming-Web-App"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-white transition-colors cursor-pointer border-b border-transparent pb-0.5
          ">
          Max Lewayer
        </a>
      </p>
    </footer>
  );
};

export default Footer;
