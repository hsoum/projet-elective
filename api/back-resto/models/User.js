const { sequelize, DataTypes } = require('../db1');

const Client = sequelize.define('Clients', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: true,
  },
  LastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  FirstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: { type: DataTypes.STRING, allowNull: false },
  Role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  birthDate: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  refreshToken: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
});

async function syncModel() {
  try {
    await sequelize.sync();

  } catch (error) {
    console.error('Error:', error);
  }
}

syncModel();

module.exports = { Client };