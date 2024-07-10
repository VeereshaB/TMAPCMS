const { DataTypes } = require('sequelize');
const { sequelize } = require('../../../database-connection/mysql-connection');
const auditingEntity = require('../../models/AuditingEntity'); // Adjust path as needed
const Organization = require('./OrganizationModel');

const User = sequelize.define('User', {
    ...auditingEntity,
    userName: {
        type: DataTypes.STRING,
        allowNull: false,
        trim: true,
        field: 'user_name'
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        trim: true,
    },
    organizationId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        field: 'organization_id',
        references: {
            model: Organization,
            key: 'id'
        }
    },
    salutation: {
        type: DataTypes.STRING,
        allowNull: true,
        trim: true,
        field: 'salutation'
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        trim: true,
        field: 'first_name'
    },
    middleName: {
        type: DataTypes.STRING,
        allowNull: true,
        trim: true,
        field: 'middle_name'
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        trim: true,
        field: 'last_name'
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        trim: true,
        field: 'status'
    },
    passwordChangeRequired: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        field: 'password_change_required'
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true,
        trim: true,
        field: 'image'
    },
    lastLoggedInDate: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW,
        field: 'last_loggedin_date'
    },
    isArchived: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        field: 'drop_out'
    },
    roles: {
        type: DataTypes.VIRTUAL
    },
    organizations: {
        type: DataTypes.VIRTUAL
    }
}, {
    tableName: 'user',
    timestamps: false
});

User.belongsTo(Organization, { foreignKey: 'organizationId', as: 'organization' });
module.exports = User;
