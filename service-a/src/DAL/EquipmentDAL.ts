import {sequelize} from '../sequelize/connectWithSequelize';
import {Equipment} from '../sequelize/sequelizeModels';

export const getAllEquipment = async () => {
  try {
    const allEquipment = await Equipment.findAll({raw: true});
    console.log('equipment:', allEquipment);    
    return allEquipment

  } catch(error) {
    console.log('fetch equipment error:', error);
  }
}