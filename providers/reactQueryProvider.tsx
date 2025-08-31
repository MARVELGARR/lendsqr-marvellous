'use client'
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister'
import {

    QueryClient,
    
  } from '@tanstack/react-query'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'

  const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24, // 24 hours
    },
  },
})

export const asyncStoragePersister =
  typeof window !== "undefined"
    ? createAsyncStoragePersister({
        storage: window.localStorage,
      })
    : null;
export function ReactQueryProvider({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      // Provide the client to your App
      <PersistQueryClientProvider persistOptions={{ persister: asyncStoragePersister }}  client={queryClient}>

            {children}
      </ PersistQueryClientProvider>
    )
  }

