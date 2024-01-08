import  {publicProcedure, router} from "../trpcServer/trpc";
import * as ImagesService from '../services/imagesService';
import * as CategoriesService from '../services/categoriesService';
import * as EquipmentService from '../services/EquipmentService';
import { z } from 'zod';
import addImageZodSchema from "../ZodValidations/AddImageValidation";


export const appRouter = router({
  getAllImages: publicProcedure.query(ImagesService.getAllImages), 
  getImagesByCategory: publicProcedure
  .input(z.string()).query(({input}) => ImagesService.getImagesByCategory(input)),
  getImageById: publicProcedure
  .input(z.string().uuid()).query(({input}) => ImagesService.getImageById(input)),
  addNewImage: publicProcedure
  .input(addImageZodSchema)
    .query(({input}) => ImagesService.addNewImage(input)),
    deleteImageById: publicProcedure
    .input(z.string().uuid()).query(({input}) => ImagesService.deleteImageById(input)),
    
    getAllCategories: publicProcedure.query(CategoriesService.getAllCategories), 
    addNewCategory: publicProcedure 
    .input(z.string()).query(({input}) => CategoriesService.addNewCategory(input)),
    
    getAllEquipment: publicProcedure.query(EquipmentService.getAllEquipment), 
    
    // fetchAllImages2: publicProcedure.query(getAllImages)

    // getEquipmentIdByName: publicProcedure
    //   .input(z.string()).query(({input}) => getEquipmentIdByName(input))
});