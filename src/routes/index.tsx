import { createBrowserRouter, redirect } from 'react-router';
import AnimeDetailPage from '../pages/AnimeDetail/AnimeDetailPage';
import AnimeListPage from '../pages/AnimeList/AnimeListPage';
import FavouritePage from '../pages/Favourite/FavouritePage';
import MainLayout from '../components/layout/MainLayout';
import HomePage from '../pages/Home/HomePage';
import AnimeDetailOverview from '../pages/AnimeDetail/_Tabs/AnimeDetailOverview';
import AnimeDetailCharacters from '../pages/AnimeDetail/_Tabs/AnimeDetailCharacters';
import AnimeDetailRelations from '../pages/AnimeDetail/_Tabs/AnimeDetailRelations';
import AnimeDetailEpisodes from '../pages/AnimeDetail/_Tabs/AnimeDetailEpisodes';
import AnimeDetailStaff from '../pages/AnimeDetail/_Tabs/AnimeDetailStaff';
import NotFoundPage from '../pages/ErrorPage';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: MainLayout,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        loader: () => redirect('/home'),
      },
      { path: '/home', Component: HomePage },
      { path: '/anime', Component: AnimeListPage },
      { path: '/favourites', Component: FavouritePage },
      {
        path: '/anime/:id',
        Component: AnimeDetailPage,
        children: [
          {
            index: true,
            loader: () => redirect('overview'),
          },
          {
            path: 'overview',
            element: <AnimeDetailOverview />,
          },
          {
            path: 'relations',
            element: <AnimeDetailRelations />,
          },
          {
            path: 'characters',
            element: <AnimeDetailCharacters />,
          },
          {
            path: 'episodes',
            element: <AnimeDetailEpisodes />,
          },
          {
            path: 'staff',
            element: <AnimeDetailStaff />,
          },
        ],
      },
    ],
  },
]);
