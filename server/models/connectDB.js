const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('nodeproject', 'root', 'Tuandoan@2404', {
    host: "127.0.0.1", // Host
    port: 3306,
    dialect:  'mysql',
  });

  module.exports = sequelize;