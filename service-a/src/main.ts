
import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { connectWithSequelize } from "./sequelize/connectWithSequelize";
import cors from 'cors';
import { appRouter } from "./router/trpcRouter";
import {applyWSSHandler} from "@trpc/server/adapters/ws";
import ws from "ws";

type AppRouter = typeof appRouter;
export default AppRouter;

const ourServer = createHTTPServer({
  middleware: cors(),
  router: appRouter,
  createContext() {
    console.log('context 3');
    return {};
  },
})

applyWSSHandler({
  wss: new ws.Server(ourServer),
  router: appRouter,
  createContext: () => {
    return {};
  }
});

ourServer.listen(5000);
console.log('server is up on port 5000');
connectWithSequelize();








// import { createHTTPServer } from "@trpc/server/adapters/standalone";
// import { connectWithSequelize } from "./sequelize/connectWithSequelize";
// import cors from 'cors';
// import { appRouter, eventEmitter } from "./router/trpcRouter";
// import { applyWSSHandler } from "@trpc/server/adapters/ws";
// import ws from "ws";

// type AppRouter = typeof appRouter;
// export default AppRouter;


// const server = createHTTPServer({
//   middleware: cors(),
//   router: appRouter,
//   createContext() {
//     console.log('context 3');
//     return {};
//   },
// });

// const wss = new ws.Server(server);

// // Mapping between categories and WebSocket connections
// export const categoryConnections = new Map<string, Set<ws>>();

// wss.on('connection', (ws) => {
//   ws.on('message', (message) => {
//     try {
//       const parsedMessage = JSON.parse(message);

//       // Handle subscription messages
//       if (parsedMessage.type === 'subscribe') {
//         handleSubscribe(ws, parsedMessage);
//       } else if (parsedMessage.type === 'unsubscribe') {
//         handleUnsubscribe(ws, parsedMessage);
//       }

//     } catch (error) {
//       console.error('Error parsing message:', error);
//     }
//   });
// });

// function handleSubscribe(ws: ws, message: { categories: string[]; }) {
//   const { categories } = message;

//   // Associate the WebSocket connection with the categories
//   categories.forEach((category: string) => {
//     if (!categoryConnections.has(category)) {
//       categoryConnections.set(category, new Set());
//     }
//     categoryConnections.get(category).add(ws);
//   });

//   console.log(`User subscribed to categories: ${categories}`);
// }

// function handleUnsubscribe(ws: ws, message: { categories: string[]; }) {
//   const { categories } = message;

//   // Disassociate the WebSocket connection from the categories
//   categories.forEach((category: string) => {
//     if (categoryConnections.has(category)) {
//       categoryConnections.get(category).delete(ws);

//       // If no more connections in the category, remove it from the map
      
//       // if (categoryConnections.get(category).size === 0) {
//       //   categoryConnections.delete(category);
//       // }
//     }
//   });

//   console.log(`User unsubscribed from categories: ${categories}`);
// }

// // Listen for events and broadcast them to subscribed connections
// // eventEmitter.on("upload", (category, data) => {
// //   if (categoryConnections.has(category)) {
// //     const connections = categoryConnections.get(category);
// //     connections.forEach((connection) => {
// //       connection.send(JSON.stringify({ type: 'message', data }));
// //     });
// //   }
// // });

// applyWSSHandler({
//   wss,
//   router: appRouter,
//   createContext: () => {
//     return {};
//   },
// });

// server.listen(5000);
// console.log('server is up on port 5000');
// connectWithSequelize();


