import jwt, { JwtPayload } from 'jsonwebtoken';
import * as DAL from '../DAL/userDAL';
import { UserCategoryInput } from '../types/types';

export const checkAndDecodeToken = (token: string) => {
  try {
    if (process.env.JWT_SECRET) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const userId: string = (decoded as JwtPayload).id;
      return userId;
    }
  } 
  catch(error) {
    console.error(error);
    return {errorMessage: 'invalid token', status: 400};
  }
}

export const getUserCategories = async (token: string) => {
  try {
    const res = checkAndDecodeToken(token);    
    if (typeof(res) === 'object') return res
    else {
      const userId = res;
      const userCategoriesQuery = `
          select category_id from users_categories
            where user_id = '${userId}'
        `;
      const userCategories = await DAL.userDetailsByQuery(userCategoriesQuery);
      if (userCategories === undefined || userCategories === null) {
        throw new Error('data not found');
      }      
      return userCategories;
    }
  }
  catch (error) {
    console.error(error)
    return error
  }
}


export const getUserImages = async (token: string) => {
  // const userId = checkAndDecodeToken(token);
  try {
    const res = checkAndDecodeToken(token);    
      if (typeof(res) === 'object') return res
      else {
        const userId = res;
        const userImagesQuery = `
          select image_id from users_images
            where user_id = '${userId}'
        `
        const userImages = await DAL.userDetailsByQuery(userImagesQuery);
        if (userImages === undefined || userImages === null) {
          throw new Error('data not found');
        }
      
        return userImages
      }
  }
  catch(error) {
    console.error(error)
    return error
  }
}


export const addCategoryToUser = async (input: UserCategoryInput) => {
  const {token, categoryId} = input;
  try {
    const res = checkAndDecodeToken(token);    
    if (typeof(res) === 'object') return res
    else {
      const userId = res;
      const addCategoryQuery = `
      insert into users_categories(
        user_id,
        category_id) 
        VALUES (
            '${userId}',
             '${categoryId}'
        )
      `;
      const addResult = await DAL.userDetailsByQuery(addCategoryQuery);
      if (addResult) 
        return 'Category added successfully'
    }
  }
  catch(error) {
    console.error(error);
    return error
  }
}

export const deleteCategoryFromUser = async (input: UserCategoryInput) => {
  const {token, categoryId} = input;
  try {
    const res = checkAndDecodeToken(token);    
    if (typeof(res) === 'object') return res
    else {
      const userId = res;
      const deleteCategoryQuery = `
      delete from users_categories 
        where user_id = '${userId}' and category_id = '${categoryId}';    
      `;
      const deleteResult = await DAL.userDetailsByQuery(deleteCategoryQuery);
      console.log('deleteResult:', deleteResult);
      if (deleteResult)
        return 'category deleted from user successfully'
    } 
  }
  catch(error) {
    console.error(error);
    return error
  }
}