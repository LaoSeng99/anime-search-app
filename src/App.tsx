import { RouterProvider } from 'react-router';
import { router } from './routes';
import { useEffect } from 'react';
import { useFavouriteStore } from './hooks/useFavouriteStore';
import { ComposeProviders } from './context/ComposeProviders';
import { DialogProvider } from './context/DialogContext';
import { ReactQueryProvider } from './context/ReactQueryProvider';

const providers = [ReactQueryProvider, DialogProvider];

function App() {
  useEffect(() => {
    useFavouriteStore.getState().init();
  }, []);

  return (
    <ComposeProviders providers={providers}>
      <RouterProvider router={router} />
    </ComposeProviders>
  );
}

export default App;
