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

export const convertEquipNameToId = async (equipmentName: string) => {
  try {
    const equipmentId = DAL.getEquipmentIdByName(equipmentName);
    if (equipmentId === undefined || equipmentId === null) {
      throw new Error("couldn't get the category id");
    }
    return equipmentId

  } catch (error) {
    throw new Error(`convert category namwe to ID error: ${error}`);
  }
}
/// add convert name to id!!