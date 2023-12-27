import {sequelize} from '../sequelize/connectWithSequelize';
import {Categories} from '../sequelize/sequelizeModels';


export const getAllCategories = async () => {
  try {
    const allCategories = await Categories.findAll({raw: true});
    console.log('all categories:', allCategories);
    return allCategories

  } catch(error) {
    console.log('fetch categories error:', error);
  }
}





export const craeteNewCategory = async () => {
  try {
    const catName = 'mr jackal';
    const newCategory = await Categories.create({name: catName});
    console.log('new Category:', newCategory);
    return newCategory

  } catch(error) {
    console.log('fetch categories error:', error);
  }
}
