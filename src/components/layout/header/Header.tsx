import { useLocation, useNavigate } from 'react-router';
import AnimeSearchBox from './AnimeSearchBox';

interface NavItem {
  name: string;
  href: string;
}

const Header = () => {
  const navItems: NavItem[] = [
    { name: 'Home', href: '/' },
    { name: 'Catalog', href: '/anime' },
    { name: 'Favourites', href: '/favourites' },
  ];

  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = (e: React.MouseEvent, href: string) => {
    e.preventDefault(); // prevent href"#"
    navigate(href);
  };

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

          <ul className="flex items-center gap-6">
            {' '}
            {navItems.map((item) => {
              const isActive = location.pathname === item.href;

              return (
                <li key={item.name}>
                  <a
                    onClick={(e) => handleNavigate(e, item.href)}
                    href={item.href} // for "right click open in new tab, block default behavior in handleNavigate"
                    className={`
                           px-3 py-2 text-md font-medium transition-all duration-200
                         text-gray-400 hover:text-white 
                        `}>
                    {item.name}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <AnimeSearchBox></AnimeSearchBox>
      </nav>
    </header>
  );
};

export default Header;
