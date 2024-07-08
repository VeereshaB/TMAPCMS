const { DataTypes } = require('sequelize');
const { sequelize } = require('../../../database-connection/mysql-connection');
const auditingEntity = require('../../models/AuditingEntity');
const Organization = require('./OrganizationModel')
const User = sequelize.define('User', {
    ...auditingEntity,
    userName: {
        type: DataTypes.STRING,
        required: true,
        trim: true,
        field: 'user_name'
    },
    password: {
        type: DataTypes.STRING,
        required: true,
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
        require: true,
        trim: true,
        field: 'salutation'
    },
    firstName: {
        type: DataTypes.STRING,
        require: true,
        trim: true,
        field: 'first_name'
    },
    middleName: {
        type: DataTypes.STRING,
        require: true,
        trim: true,
        field: 'middle_name'
    },
    lastName: {
        type: DataTypes.STRING,
        require: true,
        trim: true,
        field: 'last_name'
    },
    status: {
        type: DataTypes.BOOLEAN,
        require: true,
        defaultValue: false,
        trim: true,
        field: 'status'
    },
    passordChangeRequired: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        field: 'password_change_required'
    },
    image: {
        type: DataTypes.STRING,
        require: false,
        trim: true,
        field: 'image'
    },
    lastLoggedinDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        field: 'last_loggedin_date'
    },
    isArchived: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        field: 'drop_out'
    },
}, {
    tableName: 'user',
    timestamps: false
});

module.exports = User;
