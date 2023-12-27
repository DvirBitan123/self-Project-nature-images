import  {publicProcedure, router} from "./trpcServer/trpc";
import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { connectWithSequelize } from "./sequelize/connectWithSequelize";
import { getAllCategories, craeteNewCategory } from "./DAL/categoriesDAL";
import { getAllEquipment } from "./DAL/EquipmentDAL";
import * as SERVICE from './services/imagesService'
import cors from 'cors';
import { z } from 'zod';

const appRouter = router({
  getAllImages: publicProcedure.query(SERVICE.getAllImages), 
  getImagesbyCategory: publicProcedure
    .input(z.string()).query(({input}) => SERVICE.getImagesByCategory(input)),
  getImagebyId: publicProcedure
    .input(z.string().uuid()).query(({input}) => SERVICE.getImageById(input)),
  getAllCategories: publicProcedure.query(getAllCategories), 
  getAllEquipment: publicProcedure.query(getAllEquipment), 
  // addNewCategory: publicProcedure 
  //   .input((catName: string) => catName).mutation(() => craeteNewCategory), //to fix
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

