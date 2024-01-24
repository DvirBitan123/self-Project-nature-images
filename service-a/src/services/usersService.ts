import * as DAL from '../DAL/usersDAL';

export const getAllUsers = async () => {
  const allUsers = await DAL.getAllUsers();
  return allUsers
  
}

export const createNewUser = async (ID: string) => {
  const res = await DAL.createNewUser(ID);
  return res
  
}
