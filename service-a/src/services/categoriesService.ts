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

export const addNewCategory = async (newCategory: string) => {
  try {
    const newCatResult = await DAL.craeteNewCategory(newCategory);
    if (newCatResult === undefined || newCatResult === null) {
      throw new Error('an error occurred while adding new category');
    }
    return newCatResult

  } catch (error) {
    throw new Error(`an error occurred while adding new category: ${error}`);
  }
}

export const convertCatNameToId = async (categoryName: string) => {
  try {
    const categoryId = DAL.getCategoryIdByName(categoryName);
    if (categoryId === undefined || categoryId === null) {
      throw new Error("couldn't get the category id");
    }
    return categoryId

  } catch (error) {
    throw new Error(`convert category namwe to ID error: ${error}`);
  }
}


