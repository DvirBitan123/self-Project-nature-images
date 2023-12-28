import  {publicProcedure, router} from "../trpcServer/trpc";
import * as ImagesService from '../services/imagesService';
import * as CategoriesService from '../services/categoriesService';
import * as EquipmentService from '../services/EquipmentService';
import { getEquipmentIdByName } from "../DAL/EquipmentDAL";
import { z } from 'zod';


export const appRouter = router({
  getAllImages: publicProcedure.query(ImagesService.getAllImages), 
  getImagesByCategory: publicProcedure
    .input(z.string()).query(({input}) => ImagesService.getImagesByCategory(input)),
  getImageById: publicProcedure
    .input(z.string().uuid()).query(({input}) => ImagesService.getImageById(input)),
  addNewImage: publicProcedure
    .input(z.object({
      url: z.string(),
      alt: z.string(),
      description: z.string(),
      category: z.string(),
      equipment: z.string(),
      imageDate: z.string(),
      location: z.string(),
      lng: z.number(),
      lat: z.number()
    }))
    .query(({input}) => ImagesService.addNewImage(input)),
  deleteImageById: publicProcedure
  .input(z.string().uuid()).mutation(({input}) => ImagesService.deleteImageById(input)),
  
  getAllCategories: publicProcedure.query(CategoriesService.getAllCategories), 
  addNewCategory: publicProcedure 
    .input(z.string()).mutation(({input}) => CategoriesService.addNewCategory(input)),
  
  getAllEquipment: publicProcedure.query(EquipmentService.getAllEquipment), 
  // getEquipmentIdByName: publicProcedure
  //   .input(z.string()).query(({input}) => getEquipmentIdByName(input))
});