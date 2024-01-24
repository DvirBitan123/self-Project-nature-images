import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createWSClient, httpBatchLink, wsLink, splitLink } from '@trpc/client';
import { useState } from 'react';
import { trpc } from './trpcConnetion/ConnectTotRPC';
import NavBar from './components/NavBar';
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import Router from './router/Router';


export function App() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        splitLink({
          condition: op => {
            return op.type === "subscription"
          },
          true: wsLink({
            client: createWSClient({
              url: 'ws://localhost:5000'
            })
          }),
          false: httpBatchLink({
            url: 'http://localhost:5000',
          }),
        })
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
          {/* <NavBar /> */}
          <Router />
        </QueryClientProvider>
      </ApolloProvider>
    </trpc.Provider>
  );
}

export default App;
