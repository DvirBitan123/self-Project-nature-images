import * as DAL from '../DAL/usersDAL';

export const getAllUsers = async () => {
  const allUsers = await DAL.getAllUsers();
  console.log(' service allUsers:', allUsers);
  return allUsers
  
}


export const createNewUser = async (ID: string) => {
  const res = await DAL.createNewUser(ID);
  console.log(' service new user res:', res);
  return res
  
}
