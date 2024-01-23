import * as DAL from '../DAL/imagesDAL';
import { convertCatNameToId } from './categoriesService';
import { convertEquipNameToId } from './EquipmentService';
import { allImagesQuery } from '../sequelize/sqlQueries';
import { ImageInterface } from '../types/types';
import { eventEmitter } from '../router/trpcRouter';
// import { categoryConnections } from '../main';

export const getAllImages = async () => {
  try {
    const allImages = await DAL.getDatawithQuery(allImagesQuery);
    if (allImages === undefined || allImages === null) {
      throw new Error('data not found');
    }
    return allImages

  } catch (error) {
    console.error(error);
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
    console.error(error);
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
    console.error(error);
  }
}

export const addNewImage = async (newImage: Omit<ImageInterface, 'id'>) => {
  try {
    const allImages = await DAL.getDatawithQuery(allImagesQuery);
    for (let img of allImages) {
      if (img.url === newImage.url)
        throw new Error(`image allready exist in the DB`);
    }
    const categoryName = newImage.category;
    const categoryId = await convertCatNameToId(newImage.category);
    const equipmentId = await convertEquipNameToId(newImage.equipment);

    newImage.category = categoryId;
    newImage.equipment = equipmentId;
    const newImgRes = DAL.addNewImage(newImage);

    if (newImgRes === undefined || newImgRes === null) {
      throw new Error('data not found');
    }
    const uploadMessage = `New Image had been uploaded to ${categoryName} category!`;
    // eventEmitter.on("upload", (category, data) => {
    //   if (categoryConnections.has(category)) {
    //     const connections = categoryConnections.get(category);
    //     connections.forEach((connection) => {
    //       connection.send(JSON.stringify({ type: 'message', data }));
    //     });
    //   }
    // });
    eventEmitter.emit("upload", uploadMessage);
    return newImgRes

  } catch (error) {
    throw new Error(`error in adding new image: ${error}`);
  }
}

export const deleteImageById = async (imgId: string) => {
  try {
    const delRes = await DAL.deleteImageById(imgId);
    return delRes

  } catch (error) {
    throw new Error(`error in deletin an image: ${error}`);
  }
}

