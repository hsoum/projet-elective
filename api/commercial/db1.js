const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('comm', 'root', '', {
  host: '127.0.0.1', // ou 'localhost'
  port: 3306, // le port de votre serveur MySQL
  dialect: 'mysql',
});

module.exports = { sequelize, DataTypes };