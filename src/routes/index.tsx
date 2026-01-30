import { createBrowserRouter, redirect } from 'react-router';
import AnimeDetailPage from '../pages/AnimeDetailPage';
import AnimeListPage from '../pages/AnimeListPage';
import FavouritePage from '../pages/FavouritePage';
import HomePage from '../pages/home/HomePage';
import MainLayout from '../components/layout/MainLayout';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: MainLayout,
    //  errorElement: <NotFoundPage />,
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
      },
    ],
  },
]);
