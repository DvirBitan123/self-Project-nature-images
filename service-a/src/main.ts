import  {publicProcedure, router} from "./trpcServer/trpc";
import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { connectWithSequelize } from "./sequelize/connectWithSequelize";
import { getAllCategories, craeteNewCategory } from "./DAL/categoriesDAL";
import { getAllEquipment } from "./DAL/EquipmentDAL";
import { getAllImages } from "./DAL/imagesDAL";
import cors from 'cors';

const appRouter = router({
  getAllCategories: publicProcedure.query(getAllCategories), 
  getAllEquipment: publicProcedure.query(getAllEquipment), 
  getAllImages: publicProcedure.query(getAllImages), 
  addNewCategory: publicProcedure 
    .input((catName: string) => catName).mutation(() => craeteNewCategory), //to fix
});


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
console.log('server is up');
connectWithSequelize();

