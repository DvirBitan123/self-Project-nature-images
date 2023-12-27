import { Sequelize } from "sequelize";

// export const sequelize = new Sequelize('zqlycgcv','zqlycgcv', 'ndmJyJXVPnYz-0mCcHv5-Iy3JgfSQjD1', {
  //   host: 'hansken.db.elephantsql.com',
  //   dialect: 'postgres',
  // });


  // const sequelize = new Sequelize(process.env.PGURL);
  export const sequelize = new Sequelize('postgres://zqlycgcv:ndmJyJXVPnYz-0mCcHv5-Iy3JgfSQjD1@hansken.db.elephantsql.com/zqlycgcv');

export const connectWithSequelize = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

