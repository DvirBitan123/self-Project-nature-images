import {sequelize} from '../sequelize/connectWithSequelize';

export const getDatawithQuery = async (query: string) => {
    const [data] = await sequelize.query(query);
    return data
}
