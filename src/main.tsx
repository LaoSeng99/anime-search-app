import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { createBrowserRouter, redirect, RouterProvider } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AnimeListPage from './pages/AnimeListPage.tsx';
import AnimeDetailPage from './pages/AnimeDetailPage.tsx';
import HomePage from './pages/HomePage.tsx';
import FavouritePage from './pages/FavouritePage.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    //  errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        loader: () => redirect('/home'),
      },
      { path: '/home', Component: HomePage },
      { path: '/anime', Component: AnimeListPage },
      { path: '/favorites', Component: FavouritePage },
      {
        path: '/anime/:id',
        Component: AnimeDetailPage,
      },
    ],
  },
]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 24 * 60 * 60 * 1000, // 24 hours caching
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>,
);
