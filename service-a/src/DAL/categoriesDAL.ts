import {Categories} from '../sequelize/sequelizeModels';
import { CategoryInterface } from '../types/types';


export const getAllCategories = async (): Promise<CategoryInterface[]> => {
    const allCategories = await Categories.findAll({raw: true});
    return allCategories.map((category: any) => ({
      id: category.id,
      name: category.name,
    }));
}

export const getCategoryIdByName = async (categoryName: string) => {
    const category = await Categories.findAll({
      where: {
        name: categoryName
      }
    });
    const [categoryObj] = JSON.parse(JSON.stringify(category));
    return categoryObj.id
}




export const craeteNewCategory = async (categoryName: string) => {
    const newCategory = await Categories.create({name: categoryName});
    return newCategory
}
