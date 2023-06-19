const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('CesiEat', 'sa', 'example_123', {
  host: 'msserver', // Use the service name as the hostname
  dialect: 'mssql',
});

module.exports = { sequelize, DataTypes };