const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Dog = sequelize.define('Dog', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    breed: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    adopted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
});

module.exports = Dog;
