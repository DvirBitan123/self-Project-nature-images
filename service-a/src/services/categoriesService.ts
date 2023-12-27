import { STATUS_CODES } from 'http';
import * as DAL from '../DAL/categoriesDAL'

export const getAllCategories = async () => {
  const allCategories = await DAL.getAllCategories();
  if (allCategories === undefined || allCategories === null) {
    throw new Error('data not found');
  }
  return allCategories
}

