import { sequelize } from "../sequelize/connectWithSequelize";


export const userDetailsByQuery = async (userDetailsQuery: string) => {
  const [data] = await sequelize.query(userDetailsQuery);
    
  return data
}

// export const add



