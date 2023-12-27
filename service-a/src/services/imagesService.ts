import * as DAL from '../DAL/imagesDAL';
import { allImagesQuery } from '../sequelize/sqlQueries';

export const getAllImages = async () => {
  try {
    const allImages = await DAL.getDatawithQuery(allImagesQuery);
    if (allImages === undefined || allImages === null) {
      throw new Error('data not found');
    }
    return allImages
  } catch(error) {
    throw new Error(`error in getting all images: ${error}`);
  }
}

export const getImagesByCategory = async (category: string) => { 
  try {
    const categoryImagesQuery = `
      ${allImagesQuery} 
      where c.name = '${category}'`;
    const categoryImages = await DAL.getDatawithQuery(categoryImagesQuery);
    if (categoryImages === undefined || categoryImages === null) {
      throw new Error('data not found');
    }
    return categoryImages
    
  } catch (error) {
    throw new Error(`error in getting images by category: ${error}`);
  }
}

export const getImageById = async (ID: string) => {
  try {
    const imageByIdQuery = `
      ${allImagesQuery} 
      where i.id = '${ID}'`;
    
    const imageById = await DAL.getDatawithQuery(imageByIdQuery);    
    if (imageById === undefined || imageById === null) {
      throw new Error('data not found');
    }
    return imageById

  } catch (error) {
    console.log('error with get by id',error);
    throw new Error(`error in get by id: ${error}`);
  }
}