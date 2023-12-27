import { sequelize } from "./connectWithSequelize";
import { DataTypes, Model } from "sequelize";
import { v4 as uuidv4 } from 'uuid';

const Categories = sequelize.define('categories', {
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
  imagedate: {
    type: DataTypes.DATE,
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
},{
  createdAt: false,
  updatedAt: false
})

// Categories.hasMany(Images);
// Images.hasOne(Categories);
// Equipment.hasMany(Images);
// Images.hasOne(Equipment);

export { Categories, Equipment, Images};

