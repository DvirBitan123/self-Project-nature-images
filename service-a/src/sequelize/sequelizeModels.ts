import { sequelize } from "./connectWithSequelize";
import { DataTypes, Model } from "sequelize";
import { v4 as uuidv4 } from 'uuid';

const Categories = sequelize.define<Model>('categories', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: () => uuidv4()
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
  createdAt: false,
  updatedAt: false
});


const Equipment = sequelize.define('equipment', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: () => uuidv4(),
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
  createdAt: false,
  updatedAt: false
});


const Images = sequelize.define('images', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: () => uuidv4()
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false
  },
  alt: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false
  },
  equipment: {
    type: DataTypes.STRING,
    allowNull: false
  },
  date: {
    type: DataTypes.STRING,
    allowNull: false
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lat: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  lng: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
}, {
  createdAt: false,
  updatedAt: false
})

const Users_ids = sequelize.define('users_ids', {
  user_id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
  },
}, {
  createdAt: false,
  updatedAt: false
});

Users_ids.belongsToMany(Categories, { through: 'users_categories' });
Categories.belongsToMany(Users_ids, { through: 'users_categories' });

Users_ids.belongsToMany(Images, { through: 'users_images' });
Images.belongsToMany(Users_ids, { through: 'users_images' });



export { Categories, Equipment, Images, Users_ids };

