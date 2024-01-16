import { checkAndDecodeToken } from '../utils/jwtDecode';
import * as DAL from '../DAL/userDAL';
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
    if (addResult)
      return 'Image added successfully to the user'
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
    return 'image deleted from user successfully';
  }
  catch (error) {
    console.error(error);
    throw error
  }
}
