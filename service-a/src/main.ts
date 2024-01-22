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

