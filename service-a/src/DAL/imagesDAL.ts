import {sequelize} from '../sequelize/connectWithSequelize';
import {Images} from '../sequelize/sequelizeModels';
import { ImageInterface } from '../types/types';

export const getDatawithQuery = async (query: string) => {
    const [data]= await sequelize.query(query);
    const newData = data as ImageInterface[];
    return newData
}

export const addNewImage = async (newImage: Omit<ImageInterface, 'id'>) => {
  const NewImgRes = await Images.create({
    url: newImage.url, 
    alt: newImage.alt,
    description: newImage.description,
    category: newImage.category,
    equipment: newImage.equipment,
    imagedate: newImage.imageDate,
    location: newImage.location,
    lat: newImage.lat,
    lng: newImage.lng
  });

  return NewImgRes
}

export const deleteImageById = async (imgID: string) => {
  const res = await Images.destroy({
    where: {
      id: imgID
    }
  });
  
  return res
}