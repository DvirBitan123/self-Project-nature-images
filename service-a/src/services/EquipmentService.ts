import * as DAL from '../DAL/EquipmentDAL'

export const getAllEquipment = async () => {
  try {
    const allEquipment = await DAL.getAllEquipment();
    if (allEquipment === undefined || allEquipment === null) {
      throw new Error('data not found');
    }
    return allEquipment
  } catch (error) {
    throw new Error(`fetch all equipment error: ${error}`);
  }
}