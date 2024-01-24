import { Users_ids } from "../sequelize/sequelizeModels";

export const getAllUsers = async () => {
  const allUsers = await Users_ids.findAll({raw: true});
  return allUsers 
}


export const createNewUser = async (userID: string) => {
  const newUserRes = await Users_ids.create({user_id: userID});
  return newUserRes
}

