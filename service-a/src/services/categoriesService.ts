import * as DAL from '../DAL/categoriesDAL'

export const getAllCategories = async () => {
  try {
    const allCategories = await DAL.getAllCategories();
    if (allCategories === undefined || allCategories === null) {
      throw new Error('data not found');
    }
    return allCategories
  } catch (error) {
    throw new Error(`fetch all categories error: ${error}`);
  }

  }

