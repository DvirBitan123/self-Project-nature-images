import { checkAndDecodeToken } from "./jwtDecode";
import * as DAL from '../DAL/userDAL';

const userBodyFunc = async (query: string) => {
  const userData = await DAL.userDetailsByQuery(query);
  return userData
}




const userFuncsBody = async (
  query1: string,
  query2?: string,
  featureId?: string,
  action?: string) => {

  try {
    const userData = await DAL.userDetailsByQuery(query1);
    if (userData === undefined || userData === null) {
      throw new Error('data not found');
    }

    if (!query2) return userData;

    if (action === "add") {
      userData.map((item) => {
        if (item.image_id === featureId)
          return "Image allready exist in user account";
        else if (item.category_id === featureId)
          return "Category allreadyexist in user account";
      });
    }

    else if (action === "delete") {
      userData.map((item) => {
        if (item.image_id !== featureId)
          return "Image doesn't exist in user account";
        else if (item.category_id !== featureId)
          return "Category doesn't exist in user account";
      });
    }

    if (query2) {
      await DAL.userDetailsByQuery(query2);
      return `${action} had been made successfully`
    }

  }
  catch (error) {
    console.error(error);
    return error
  }
}

export {userFuncsBody}