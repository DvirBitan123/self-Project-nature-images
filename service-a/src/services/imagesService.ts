import * as DAL from '../DAL/imagesDAL';
import { convertCatNameToId } from './categoriesService';
import { convertEquipNameToId } from './EquipmentService';
import { allImagesQuery } from '../utils/sqlQueries';
import { ImageInterface } from '../types/types';
import { eventEmitter } from '../Subscription/uploadSubscription';

export const getAllImages = async () => {
  try {
    const allImages = await DAL.getDatawithQuery(allImagesQuery);
    if (allImages === undefined || allImages === null) {
      throw new Error('data not found');
    }
    return allImages

  } catch (error) {
    throw error
  }
}

export const getImagesByCategory = async (category: string) => {
  try {
    let categoryImagesQuery = allImagesQuery;

    if (category !== 'All')
      categoryImagesQuery += `where c.name = '${category}'`;


    const categoryImages = await DAL.getDatawithQuery(categoryImagesQuery);
    if (categoryImages === undefined || categoryImages === null) {
      throw new Error('data not found');
    }
    return categoryImages

  } catch (error) {
    throw error
  }
}

export const getImageById = async (ID: string) => {
  try {
    const imageByIdQuery = `
      ${allImagesQuery} 
      where i.id = '${ID}'`;

    const [imageById] = await DAL.getDatawithQuery(imageByIdQuery);
    if (imageById === undefined || imageById === null) {
      throw new Error('data not found');
    }
    return imageById

  } catch (error) {
    throw error
  }
}

export const deleteImageById = async (imgId: string) => {
  try {
    const delRes = await DAL.deleteImageById(imgId);
    return delRes

  } catch (error) {
    throw error
  }
}

export const addNewImage = async (newImage: Omit<ImageInterface, 'id'>) => {
  try {
    const allImages = await DAL.getDatawithQuery(allImagesQuery);
    for (let img of allImages) {
      if (img.url === newImage.url)
        throw new Error(`image allready exist in the DB`);
    };

    const categoryName = newImage.category;
    const categoryId = await convertCatNameToId(newImage.category);
    const equipmentId = await convertEquipNameToId(newImage.equipment);

    newImage.category = categoryId;
    newImage.equipment = equipmentId;
    const newImgRes = DAL.addNewImage(newImage);

    if (newImgRes === undefined || newImgRes === null) {
      throw new Error('data not found');
    };

    const uploadMessage = `New Image had been uploaded to ${categoryName} category!`;
    switch (categoryName) {
      case "Animals":
        eventEmitter.emit("Animals_upload", uploadMessage);
        break;
      case "Birds":
        eventEmitter.emit("Birds_upload", uploadMessage);
        break;
      case "Reptails":
        eventEmitter.emit("Reptails_upload", uploadMessage);
        break;
      case "Plants":
        eventEmitter.emit("Plants_upload", uploadMessage);
        break;
      case "Landscapes":
        eventEmitter.emit("Landscapes_upload", uploadMessage);
        break;
      default:
        break;
    }

    return newImgRes

  } catch (error) {
    throw error
  }
}

