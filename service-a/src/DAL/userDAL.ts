import { sequelize } from "../sequelize/connectWithSequelize";
import { UserOutput } from "../types/types";

export const userDetailsByQuery = async (userDetailsQuery: string) => {
  const [data] = await sequelize.query(userDetailsQuery);
  const newData = data as UserOutput[];
  return newData
}






