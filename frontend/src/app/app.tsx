import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import React, { useState } from 'react';
import { trpc } from './utils/ConnectTotRPC';
import NavBar from './components/NavBar';
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import Router from './router/Router';

export function App() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: 'http://localhost:5000',
        }),
      ],
    }),
  );

  const client = new ApolloClient({
    uri: 'http://localhost:3000/graphql',
    cache: new InMemoryCache()
  })


  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <ApolloProvider client={client}>
        <QueryClientProvider client={queryClient}>
          <NavBar />
          <Router />
        </QueryClientProvider>
      </ApolloProvider>
    </trpc.Provider>
  );
}

export default App;
