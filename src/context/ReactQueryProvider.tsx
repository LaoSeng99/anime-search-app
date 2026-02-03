import {} from '@tanstack/react-query';
import { indexedDBPersister, queryClient } from '../services/queryClient';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { LOCAL_CACHE_TIME } from '../types/app.constant';
import InitialLayer from '../components/layout/InitialLayer';
import { useState } from 'react';

export const ReactQueryProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isReady, setIsReady] = useState(false);

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{
        persister: indexedDBPersister,
        maxAge: LOCAL_CACHE_TIME,
      }}
      onSuccess={() => setIsReady(true)}>
      <InitialLayer isLoading={!isReady}></InitialLayer>

      {isReady && children}
    </PersistQueryClientProvider>
  );
};
