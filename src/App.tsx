import { RouterProvider } from 'react-router';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './services/queryClient';
import { router } from './routes';
import { useEffect } from 'react';
import { useFavouriteStore } from './hooks/useFavouriteStore';

function App() {
  useEffect(() => {
    useFavouriteStore.getState().init();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
