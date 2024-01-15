import { publicProcedure, router } from "../trpcServer/trpc";
import * as ImagesService from '../services/imagesService';
import * as CategoriesService from '../services/categoriesService';
import * as EquipmentService from '../services/EquipmentService';
import * as UserService from '../services/userCategoriesService';
import { z } from 'zod';
import {addImageZodSchema, EditUserCategory} from "../ZodValidations/zodObjectsValidations";


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

  // USER DETAILS
  getUserCategories: publicProcedure.input(z.string()).query(({ input }) => UserService.getUserCategories(input)),
  getUserImages: publicProcedure.input(z.string()).query(({ input }) => UserService.getUserImages(input)),
  addUserCategory: publicProcedure.input(EditUserCategory).query(({ input }) => UserService.addCategoryToUser(input)),
  deleteUserCategory: publicProcedure.input(EditUserCategory).query(({ input }) => UserService.deleteCategoryFromUser(input))
});