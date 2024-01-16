import * as DAL from '../DAL/userDAL';
import { UserCategoryInput, UserOutput } from '../types/types';
import { checkAndDecodeToken } from '../utils/jwtDecode';


export const getUserCategories = async (token: string) => {
  try {
    const res = checkAndDecodeToken(token);
    
    const userId = res;
    const userCategoriesQuery = `
        select c.name as category 
        from users_categories uc join categories c 
          ON uc.category_id = c.id
            where user_id = '${userId}'`;
    const userCategories = await DAL.userDetailsByQuery(userCategoriesQuery);
    if (userCategories === undefined || userCategories === null) {
      throw new Error('data not found');
    }
    const categoriesArr = userCategories.map((item) => {
      return item.category
    })
    return categoriesArr
  }
  catch (error) {
    console.error(error)
    throw error
  }
}


export const addCategoryToUser = async (input: UserCategoryInput) => {
  const { token, categoryId } = input;
  try {
    const res = checkAndDecodeToken(token);
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
  catch (error) {
    console.error(error);
    throw error
  }
}

export const deleteCategoryFromUser = async (input: UserCategoryInput) => {
  const { token, categoryId } = input;
  try {
    const res = checkAndDecodeToken(token);
    const userId = res;
    const deleteCategoryQuery = `
        delete from users_categories 
          where user_id = '${userId}' and category_id = '${categoryId}';    
      `;
    const deleteResult = await DAL.userDetailsByQuery(deleteCategoryQuery);
    return 'category deleted from user successfully';
  }
  catch (error) {
    console.error(error);
    throw error
  }
}