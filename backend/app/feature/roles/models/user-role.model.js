const { DataTypes } = require('sequelize');
const { sequelize } = require('../../../database-connection/mysql-connection');
const Role=require('./roles.model');
const User=require('../../users/models/UserModel')

const UserRole = sequelize.define('UserRole', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'user_id',
    references: {
      model: User,
      key: 'id'
    }
  },
  roleId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'role_id',
    references: {
      model: Role,
      key: 'id'
    }
  }
}, {
  tableName: 'user_role',
  timestamps: false
});

// Define associations explicitly
UserRole.belongsTo(User, { foreignKey: 'user_id' });
UserRole.belongsTo(Role, { foreignKey: 'role_id' });

module.exports = UserRole;
