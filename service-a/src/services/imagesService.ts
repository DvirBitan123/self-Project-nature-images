import * as DAL from '../DAL/imagesDAL';
import { convertCatNameToId } from './categoriesService';
import { convertEqNameToId } from './EquipmentService';
import { allImagesQuery } from '../sequelize/sqlQueries';
import { ImageInterface } from '../types/types';

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
    throw new Error(`error in get by id: ${error}`);
  }
}

export const addNewImage = async (newImage: Omit<ImageInterface, 'id'>) => {
  try {
    const allImages = await DAL.getDatawithQuery(allImagesQuery);
    for (let img of allImages) {
      if (img.url === newImage.url)
        throw new Error(`image allready exist in the DB`);
    }

    const categoryId = await convertCatNameToId(newImage.category);
    const equipmentId = await convertEqNameToId(newImage.equipment);

    newImage.category = categoryId;
    newImage.equipment = equipmentId;   
    const newImgRes = DAL.addNewImage(newImage);

    if (newImgRes === undefined || newImgRes === null) {
      throw new Error('data not found');
    }
    return newImgRes

  } catch (error) {
    throw new Error(`error in adding new image: ${error}`);
  }
}

export const deleteImageById = async(imgId: string) => {
  try {
    const delRes = await DAL.deleteImageById(imgId);
    return delRes

  } catch (error) {
    throw new Error(`error in deletin an image: ${error}`);
  }
}

