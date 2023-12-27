import  {publicProcedure, router} from "../trpcServer/trpc";
import * as ImagesService from '../services/imagesService';
import * as CategoriesService from '../services/categoriesService';
import * as EquipmentService from '../services/EquipmentService';
import { z } from 'zod';

export const appRouter = router({
  getAllImages: publicProcedure.query(ImagesService.getAllImages), 
  getImagesbyCategory: publicProcedure
    .input(z.string()).query(({input}) => ImagesService.getImagesByCategory(input)),
  getImagebyId: publicProcedure
    .input(z.string().uuid()).query(({input}) => ImagesService.getImageById(input)),
  getAllCategories: publicProcedure.query(CategoriesService.getAllCategories), 
  getAllEquipment: publicProcedure.query(EquipmentService.getAllEquipment), 
  // addNewCategory: publicProcedure 
  //   .input((catName: string) => catName).mutation(() => craeteNewCategory), //to fix
});