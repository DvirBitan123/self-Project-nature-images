import { publicProcedure, router } from "../trpcServer/trpc";
import * as ImagesService from '../services/imagesService';
import * as CategoriesService from '../services/categoriesService';
import * as EquipmentService from '../services/EquipmentService';
import * as UserCategoriesService from '../services/userCategoriesService';
import * as UserImagesService from '../services/userImagesService';
import { z } from 'zod';
import {addImageZodSchema, ZodUserCategory, ZodUserImage} from "../ZodValidations/zodObjectsValidations";


export const appRouter = router({
  //IMAGES
  getAllImages: publicProcedure.query(ImagesService.getAllImages),
  getImagesByCategory: publicProcedure
    .input(z.string()).query(({ input }) => ImagesService.getImagesByCategory(input)),
  getImageById: publicProcedure
    .input(z.string().uuid()).query(({ input }) => ImagesService.getImageById(input)),
  addNewImage: publicProcedure
    .input(addImageZodSchema)
    .query(({ input }) => ImagesService.addNewImage(input)),
  deleteImageById: publicProcedure
    .input(z.string().uuid()).query(({ input }) => ImagesService.deleteImageById(input)),

  // CATEGORIES
  getAllCategories: publicProcedure.query(CategoriesService.getAllCategories),
  addNewCategory: publicProcedure
    .input(z.string()).query(({ input }) => CategoriesService.addNewCategory(input)),

  // EQUIPMENT
  getAllEquipment: publicProcedure.query(EquipmentService.getAllEquipment),

  // USER CATEGORIES
  getUserCategories: publicProcedure.input(z.string()).query(({ input }) => UserCategoriesService.getUserCategories(input)),
  addUserCategory: publicProcedure.input(ZodUserCategory).query(({ input }) => UserCategoriesService.addCategoryToUser(input)),
  deleteUserCategory: publicProcedure.input(ZodUserCategory).query(({ input }) => UserCategoriesService.deleteCategoryFromUser(input)),
  
  // USER IMAGES
  getUserImages: publicProcedure.input(z.string()).query(({ input }) => UserImagesService.getUserImages(input)),
  addUserImage: publicProcedure.input(ZodUserImage).query(({ input }) => UserImagesService.addImageToUser(input)),
  deleteUserImage: publicProcedure.input(ZodUserImage).query(({ input }) => UserImagesService.deleteImageFromUser(input)),

});