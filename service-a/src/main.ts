import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { connectWithSequelize } from "./sequelize/connectWithSequelize";
import cors from 'cors';
import { appRouter } from "./router/trpcRouter";


type AppRouter = typeof appRouter;
export default AppRouter;

createHTTPServer({
  middleware: cors(),
  router: appRouter,
  createContext() {
    console.log('context 3');
    return {};
  },
}).listen(5000);
console.log('server is up on port 5000');
connectWithSequelize();

