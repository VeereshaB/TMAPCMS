const { DataTypes } = require('sequelize');

const baseEntity = {
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
    }
};

module.exports = baseEntity;
