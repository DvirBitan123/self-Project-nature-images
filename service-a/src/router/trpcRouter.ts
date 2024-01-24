import { t, publicProcedure, router } from "../trpcServer/trpc";
import * as ImagesService from '../services/imagesService';
import * as CategoriesService from '../services/categoriesService';
import * as EquipmentService from '../services/EquipmentService';
import * as UsersService from '../services/usersService';
import * as UserCategoriesService from '../services/userCategoriesService';
import * as UserImagesService from '../services/userImagesService';
import { uploadSubscription } from "../Subscription/uploadSubscription";
import { z } from 'zod';
import {addImageZodSchema, ZodUserCategory, ZodUserImage} from "../ZodValidations/zodObjectsValidations";


export const appRouter = router({
  //IMAGES
  getAllImages: publicProcedure.query(ImagesService.getAllImages),
  getImagesByCategory: publicProcedure.input(z.string()).query(({ input }) => ImagesService.getImagesByCategory(input)),
  getImageById: publicProcedure.input(z.string().uuid()).query(({ input }) => ImagesService.getImageById(input)),
  addNewImage: publicProcedure.input(addImageZodSchema).mutation(({ input }) => ImagesService.addNewImage(input)),
  deleteImageById: publicProcedure.input(z.string().uuid()).mutation(({ input }) => ImagesService.deleteImageById(input)),

  // CATEGORIES
  getAllCategories: publicProcedure.query(CategoriesService.getAllCategories),
  addNewCategory: publicProcedure.input(z.string()).mutation(({ input }) => CategoriesService.addNewCategory(input)),
  deleteCategory: publicProcedure.input(z.string()).mutation(({input}) => CategoriesService.deleteCategory(input)),
  
  // EQUIPMENT
  getAllEquipment: publicProcedure.query(EquipmentService.getAllEquipment),

  //USER
  getAllUsers: publicProcedure.query(UsersService.getAllUsers),
  createNewUser: publicProcedure.input(z.string().uuid()).mutation(({ input }) => UsersService.createNewUser(input)),

  // USER IMAGES
  getUserImages: publicProcedure.input(z.string()).query(({ input }) => UserImagesService.getUserImages(input)),
  getUserImagesIds: publicProcedure.input(z.string()).query(({ input }) => UserImagesService.getUserImgIds(input)),
  addUserImage: publicProcedure.input(ZodUserImage).mutation(({ input }) => UserImagesService.addImageToUser(input)),
  deleteUserImage: publicProcedure.input(ZodUserImage).mutation(({ input }) => UserImagesService.deleteImageFromUser(input)),
  
  // USER CATEGORIES
  getUserCategories: publicProcedure.input(z.string()).query(({ input }) => UserCategoriesService.getUserCategories(input)),
  addUserCategory: publicProcedure.input(ZodUserCategory).mutation(({ input }) => UserCategoriesService.addCategoryToUser(input)),
  deleteUserCategory: publicProcedure.input(ZodUserCategory).mutation(({ input }) => UserCategoriesService.deleteCategoryFromUser(input)),
  

  // UPLOAD IMAGE SUBSCRIPTION
  onUpload: publicProcedure.input(z.array(z.string())).subscription(({input}) => uploadSubscription(input))  
});

