import { checkAndDecodeToken } from '../utils/jwtDecode';
import * as DAL from '../DAL/userFavoritesDAL';
import { UserImageInput } from '../types/types';

export const getUserImages = async (token: string) => {
  try {
    const res = checkAndDecodeToken(token);
    const userId = res;
    const userImagesQuery = `
          select uc.image_id as image_id, i.url, i.alt as image
          from users_images uc JOIN images i
          ON uc.image_id = i.id
            where user_id = '${userId}'
        `;
    const userImages = await DAL.userDetailsByQuery(userImagesQuery);

    if (userImages === undefined || userImages === null) {
      throw new Error('data not found');
    }

    return userImages
  }
  catch (error) {
    console.error(error)
    throw error
  }
}

export const getUserImgIds = async (token: string) => {
  try {
    const res = checkAndDecodeToken(token);
    const userId = res;
    const userImagesQuery = `
      select image_id from users_images 
          where user_id = '${userId}'
    `;
    const DalRes = await DAL.returnUserImgsId(userImagesQuery);
    console.log('userImagesIds:', DalRes);
    if (DalRes === undefined || DalRes === null) {
      throw new Error('data not found');
    };

    const userImagesIds = DalRes.map((image) => {
      return image.image_id
    });
    
    return userImagesIds
  }
  catch (error) {
    console.error(error)
    throw error
  }
}


export const addImageToUser = async (input: UserImageInput) => {
  const { token, imageId } = input;
  try {
    const res = checkAndDecodeToken(token);
    const userId = res;
    // const userImagesQuery = `
    //     select image_id from users_images
    //       where user_id = '${userId}' `;

    const addImageQuery = `
      insert into users_images(
        user_id,
        image_id) 
        VALUES (
            '${userId}',
             '${imageId}'
        )`;
    const addResult = await DAL.userDetailsByQuery(addImageQuery);
    if (addResult) {
      const userImagIdsQuery = `
      select image_id from users_images 
          where user_id = '${userId}'
    `;
      const res = await DAL.returnUserImgsId(userImagIdsQuery) 
      if (res === undefined || res === null) {
        throw new Error('data not found');
      };
  
      const userImagesIds = res.map((image) => {
        return image.image_id
      });
      
      return userImagesIds
    }
      // return 'Image added successfully to the user'
  }
  catch (error) {
    console.error(error);
    throw error
  }
}

export const deleteImageFromUser = async (input: UserImageInput) => {
  const { token, imageId } = input;
  try {
    const res = checkAndDecodeToken(token);
    const userId = res;
    const deleteImageQuery = `
      delete from users_images 
        where user_id = '${userId}' and image_id = '${imageId}'
    `;
    const deleteResult = await DAL.userDetailsByQuery(deleteImageQuery);
    
    const userImagIdsQuery = `
    select image_id from users_images 
        where user_id = '${userId}'
  `;
    const DalResult = await DAL.returnUserImgsId(userImagIdsQuery) ;
      if (DalResult === undefined || DalResult === null) {
        throw new Error('data not found');
      };
  
      const userImagesIds = DalResult.map((image) => {
        return image.image_id
      });
      
      return userImagesIds
  }
  catch (error) {
    console.error(error);
    throw error
  }
}

