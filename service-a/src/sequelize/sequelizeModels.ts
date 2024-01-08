import { sequelize } from "./connectWithSequelize";
import { DataTypes } from "sequelize";
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
},{
  createdAt: false,
  updatedAt: false
})


/// check if it's needed
Categories.hasMany(Images, { 
  foreignKey: 'category',
  as: 'Category' 
});
Images.belongsTo(Categories, { 
  foreignKey: 'category',
  as: 'Category' 
});

Equipment.hasMany(Images, { 
  foreignKey: 'equipment',
  as: 'Equipment' 
});
Images.belongsTo(Equipment, { 
  foreignKey: 'equipment',
  as: 'Equipment' 
});

export { Categories, Equipment, Images};

