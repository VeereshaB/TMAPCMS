const { DataTypes } = require('sequelize');
const { sequelize } = require('../../database-connection/mysql-connection');
const auditingEntity = require('../models/AuditingEntity');
const Organization = require('../users/models/OrganizationModel');
const Region = require('./RegionModel');

const Employee = sequelize.define('Employee', {
    ...auditingEntity,
    firstName: {
        type: DataTypes.STRING(50),
        allowNull: false,
        trim:true,
        field: 'first_name',
    },
    lastName: {
        type: DataTypes.STRING(50),
        allowNull: false,
        trim:true,
        field: 'last_name',
    },
    dateOfBirth: {
        type: DataTypes.DATEONLY,  // Changed to DATEONLY as per the Liquibase type
        allowNull: false,
        trim:true,
        field: 'date_of_birth',
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
    phoneNumber: {
        type: DataTypes.STRING(20),
        trim:true,
        field: 'phone_number',
    },
    hireDate: {
        type: DataTypes.DATEONLY,  // Changed to DATEONLY as per the Liquibase type
        allowNull: false,
        trim:true,
        field: 'hire_date',
    },
    salary: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        field: 'salary',
    },
    department: {
        type: DataTypes.STRING(50),
        trim:true,
        field: 'department',
    },
    position: {
        type: DataTypes.STRING(50),
        trim:true,
        field: 'position',
    },
    emergencyContactName: {
        type: DataTypes.STRING(100),
        trim:true,
        field: 'emergency_contact_name',
    },
    emergencyContactPhone: {
        type: DataTypes.STRING(20),
        trim:true,
        field: 'emergency_contact_phone',
    },
    emergencyContactRelationship: {
        type: DataTypes.STRING(50),
        trim:true,
        field: 'emergency_contact_relationship',
    },
    pfAccountNumber: {
        type: DataTypes.STRING(20),
        trim:true,
        unique:true,
        field: 'pf_account_number',
    },
    pfContribution: {
        type: DataTypes.DECIMAL(10, 2),
        field: 'pf_contribution',
    },
    pfJoinDate: {
        type: DataTypes.DATEONLY,  // Changed to DATEONLY as per the Liquibase type
        trim:true,
        field: 'pf_join_date',
    },
    pfExitDate: {
        type: DataTypes.DATEONLY,  // Changed to DATEONLY as per the Liquibase type
        trim:true,
        field: 'pf_exit_date',
    },
    organizationId: {
        type: DataTypes.BIGINT,  // Ensure this matches the Liquibase schema
        allowNull: false,
        trim:true,
        field: 'organization_id',
        references: {
            model: Organization,
            key: 'id',  // Ensure this matches the primary key in Organization model
        }
    }
}, {
    tableName: 'employee',
    timestamps: false // Disable automatic timestamping; use custom fields for tracking
});

// Define associations
Employee.belongsTo(Organization, { foreignKey: 'organizationId', as: 'organization' });
Employee.hasMany(Region, { foreignKey: 'employeeId', as: 'regions' });

module.exports = Employee;
