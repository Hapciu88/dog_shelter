const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('dogshelter', 'dogshelteruser', '18h23endiashbdhbzxc', {
    host: 'localhost',
    dialect: 'mysql',
});

module.exports = sequelize;