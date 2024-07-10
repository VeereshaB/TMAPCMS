const { DataTypes } = require('sequelize');
const { sequelize } = require('../../../database-connection/mysql-connection');
const auditingEntity = require('../../models/AuditingEntity');
const Organization = sequelize.define('Organization', {
    ...auditingEntity,
    organizationName: {
        type: DataTypes.STRING,
        required: true,
        trim: true,
        field: 'organization_name'
    },
    branchName: {
        type: DataTypes.STRING,
        required: true,
        trim: true,
        field: 'branch_name'
    },
    isMainBranch: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        field: 'is_main_branch'
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        trim: true,
        lowercase: true,
        field: 'email',
        validate: {
            validator: function (v) {
                return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                    v
                );
            },
            message: (props) => `${props.value} is not a valid email!`,
        },
    },
    phone:{
        type: DataTypes.STRING,
        required: true,
        trim: true,
        field:'phone'
    },
    address: {
        type: DataTypes.STRING,
        required: true,
        trim: true,
        field: 'address'
    },
    state: {
        type: DataTypes.STRING,
        required: true,
        trim: true,
        field: 'state'
    },
    city: {
        type: DataTypes.STRING,
        required: true,
        trim: true,
        field: 'city'
    },
    zip: {
        type: DataTypes.STRING,
        required: true,
        trim: true,
        field: 'zip'
    },
    country: {
        type: DataTypes.STRING,
        required: true,
        trim: true,
        field: 'country'
    },
    activated: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        trim: true,
        field: 'activated'
    },
    subscribed: {
        type: DataTypes.STRING,
        required: false,
        trim: true,
        field: 'subscribed'
    },
    subscriptionId: {
        type: DataTypes.STRING,
        required: false,
        trim: true,
        field: 'subscription_id'
    },
    subscriptionStartDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        required: false,
        // trim: true,
        field: 'subscription_start_date'
    },
    subscriptionEndDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        required: false,
        // trim: true,
        field: 'subscription_end_date'
    },
    docsVerified: {
        type: DataTypes.STRING,
        required: false,
        trim: true,
        field: 'docs_verified'
    },
    documentsLocation: {
        type: DataTypes.STRING,
        required: false,
        trim: true,
        field: 'documents_location'
    },
    webUrl: {
        type: DataTypes.STRING,
        required: false,
        trim: true,
        field: 'web_url'
    },

}, {
    tableName: 'organization',
    timestamps: false
});
module.exports = Organization;
