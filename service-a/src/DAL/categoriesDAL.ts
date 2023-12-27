import {Categories} from '../sequelize/sequelizeModels';


export const getAllCategories = async () => {
    const allCategories = await Categories.findAll({raw: true});
    return allCategories
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
