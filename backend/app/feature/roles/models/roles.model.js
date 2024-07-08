const { DataTypes } = require('sequelize');
const { sequelize } = require('../../../database-connection/mysql-connection');

const Role = sequelize.define('Role', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    required: true,
    trim: true,
  }
}, {
  tableName: 'role',
  timestamps: false
});

module.exports = Role;
