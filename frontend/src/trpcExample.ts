// import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
// import type AppRouter from '../../service-a/src/main'
// //     👆 **type-only** import

// // Pass AppRouter as generic here. 👇 This lets the `trpc` object know
// // what procedures are available on the server and their input/output types.
// const trpc = createTRPCProxyClient<AppRouter>({
//   links: [
//     httpBatchLink({
//       url: 'http://localhost:5000',
//     }),
//   ],
// });

// export default async function tRPCTest() {
//   try {
//     const users = await trpc.userList.query();
//     console.log('users:', users);
    
//     return users

//   } catch(error) {
//     console.log('an error in the client yyyyaaaauuuu eizo sara', error);
//   }
// }