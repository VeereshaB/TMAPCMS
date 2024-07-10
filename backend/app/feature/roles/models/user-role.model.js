const { DataTypes } = require('sequelize');
const { sequelize } = require('../../../database-connection/mysql-connection');
const User = require('../../users/models/UserModel');
const Role = require('../../roles/models/roles.model');

const UserRole = sequelize.define('user_role', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userId: {
        type: DataTypes.BIGINT,
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

UserRole.belongsTo(User, { foreignKey: 'userId' });
UserRole.belongsTo(Role, { foreignKey: 'roleId' });

module.exports = UserRole;
