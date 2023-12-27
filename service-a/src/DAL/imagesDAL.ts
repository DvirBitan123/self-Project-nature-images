import {sequelize} from '../sequelize/connectWithSequelize';
import { animalQuery } from '../sequelize/sqlQueries';

export const getAllImages = async () => {
  try {
    const [data] = await sequelize.query(animalQuery);
    console.log('all images:', data);
    return data

  } catch(error) {
    console.log('fetch categories error:', error);
  }
}