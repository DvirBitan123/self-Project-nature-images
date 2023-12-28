import {Equipment} from '../sequelize/sequelizeModels';

export const getAllEquipment = async () => {
    const allEquipment = await Equipment.findAll({raw: true});
    return allEquipment
}

export const getEquipmentIdByName = async (equipmentName: string) => {
  try {
    const myEquipment = await Equipment.findAll({
      where: {
        name: equipmentName
      }
    });
    const [equipmentObj] = JSON.parse(JSON.stringify(myEquipment));    
    return equipmentObj.id

  } catch (error) {
    throw new Error(`error in converting name to id: ${error}`);
  }
}