const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('master', 'sa', 'ALmJhd2852J', {
  host: 'msserver',
  dialect: 'mssql',
});

module.exports = { sequelize, DataTypes };
