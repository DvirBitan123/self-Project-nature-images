import { Sequelize } from "sequelize";

// connect to pgAdmin:
export const sequelize = new Sequelize('ImagesDB','postgres', 'bitan212', {
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',
  });


// connect to elephentQL:
  // const sequelize = new Sequelize(process.env.PGURL);
  // export const sequelize = new Sequelize('postgres://zqlycgcv:ndmJyJXVPnYz-0mCcHv5-Iy3JgfSQjD1@hansken.db.elephantsql.com/zqlycgcv');

export const connectWithSequelize = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

