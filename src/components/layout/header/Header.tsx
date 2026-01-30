import AnimeSearchBox from './AnimeSearchBox';

const Header = () => {
  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Catalog', href: '/anime' },
    { name: 'Favorites', href: '/favorites' },
  ];

  return (
    <header className="fixed top-0 z-50 w-full h-20 backdrop-blur-md border-b  text-white border-white/10 flex items-center px-10 ">
      <nav className="flex items-center justify-between w-full ">
        {/*  Logo Section */}
        <div className="flex items-center gap-10">
          <a
            href="/"
            className="text-3xl font-bold tracking-tight cursor-pointer font-heading">
            AnimeSearch
          </a>

          <ul className="flex items-center gap-4">
            {navItems.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className="px-3 py-2 text-gray-300 hover:text-gray-50 rounded-md transition-all">
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <AnimeSearchBox></AnimeSearchBox>
      </nav>
    </header>
  );
};

export default Header;
