import {Equipment} from '../sequelize/sequelizeModels';

export const getAllEquipment = async () => {
    const allEquipment = await Equipment.findAll({raw: true});
    return allEquipment
}

