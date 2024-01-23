import { sequelize } from "../sequelize/connectWithSequelize";
import { UserOutput, UserImgIdOutput, UserCategoriesOutput } from "../types/types";

export const userDetailsByQuery = async (userDetailsQuery: string) => {
  const [data] = await sequelize.query(userDetailsQuery);
  const newData = data as UserOutput[];
  return newData
}

export const returnUserCategories = async (userDetailsQuery: string) => {
  const [data] = await sequelize.query(userDetailsQuery);
  const newData = data as UserCategoriesOutput[];
  return newData
}


export const returnUserImgsId = async (userDetailsQuery: string) => {
  const [data] = await sequelize.query(userDetailsQuery);
  const newData = data as UserImgIdOutput[];
  return newData
}






