import { QueryClient } from '@tanstack/react-query';
import { LOCAL_CACHE_TIME, USE_QUERY_STALE } from '../types/app.constant';
import { persistQueryClient } from '@tanstack/react-query-persist-client';
import { del, get, set } from 'idb-keyval';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // gcTime = how long will keep in memory/index db
      gcTime: LOCAL_CACHE_TIME,
      staleTime: USE_QUERY_STALE, // after how long to retrieve data
      retry: 3,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 10000),
      refetchOnWindowFocus: false,
    },
  },
});

const APP_CACHE_KEY = 'ANIME_SEARCH_APP_CACHE';

const indexedDBPersister = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  persistClient: async (client: any) => {
    await set(APP_CACHE_KEY, client);
  },
  restoreClient: async () => {
    return await get(APP_CACHE_KEY);
  },
  removeClient: async () => {
    await del(APP_CACHE_KEY);
  },
};

persistQueryClient({
  queryClient,
  persister: indexedDBPersister,
  // The maximum time (in ms) until persisted data is considered invalid.
  // If the data in IndexedDB is older than 24h, it will be discarded during restoration.
  maxAge: LOCAL_CACHE_TIME,
});
