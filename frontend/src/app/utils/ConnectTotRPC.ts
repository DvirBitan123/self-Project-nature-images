import { createTRPCReact, createTRPCProxyClient, httpBatchLink } from '@trpc/react-query';
import type AppRouter from '../../../../service-a/src/main';
 
export const trpc = createTRPCReact<AppRouter>();

export const trpc2 = createTRPCProxyClient<AppRouter>({
  links:[
    httpBatchLink({
      url: 'http://localhost:5000'
    })
  ]
})


