const { DataTypes } = require('sequelize');
const { sequelize } = require('../../database-connection/mysql-connection');
const Employee = require('./EmployeesModel');  // Ensure correct path to Employee model

const Region = sequelize.define('Region', {
    id: {
        type: DataTypes.BIGINT,  // Changed to BIGINT to match the Liquibase schema
        autoIncrement: true,
        primaryKey: true,
        field: 'id',
    },
    regionName: {
        type: DataTypes.STRING(100),
        allowNull: false,
        trim:true,
        field: 'region_name',
    },
    employeeId: {
        type: DataTypes.BIGINT,  // Ensure this matches the Liquibase schema
        allowNull: false,
        field: 'employee_id',
        references: {
            model: Employee,
            key: 'id',  // Ensure this matches the primary key in Employee model
        }
    },
    country: {
        type: DataTypes.STRING(100),
        allowNull: false,
        trim:true,
        field: 'country',
    },
    state: {
        type: DataTypes.STRING(100),
        trim:true,
        field: 'state',
    },
    city: {
        type: DataTypes.STRING(100),
        trim:true,
        field: 'city',
    }
}, {
    tableName: 'region',
    timestamps: false // Disable automatic timestamping
});

// Define associations
// Region.belongsTo(Employee, { foreignKey: 'employeeId', as: 'employee' });

module.exports = Region;
