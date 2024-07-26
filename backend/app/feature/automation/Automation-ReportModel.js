const { DataTypes } = require('sequelize');
const { sequelize } = require('../../database-connection/mysql-connection');
const Projects = require('../projects/ProjectModel');

const AutomationReport = sequelize.define('AutomationReport', {
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    totalPassedCount: {
        type: DataTypes.BIGINT,
        field: 'total_passed_count'
    },
    totalFailedCount: {
        type: DataTypes.BIGINT,
        field: 'total_failed_count'
    },
    totalBreakedCount: {
        type: DataTypes.BIGINT,
        field: 'total_breaked_count'
    },
    totalTestCases: {
        type: DataTypes.BIGINT,
        field: 'total_test_cases'
    },
    notExecuteTestCases: {
        type: DataTypes.BIGINT,
        field: 'not_execute_test_cases'
    },
    executedTestCases: {
        type: DataTypes.BIGINT,
        field: 'executed_test_cases'
    },
    projectId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: Projects,
            key: 'id'
        },
        field: 'project_id'
    },
    models: {
        type: DataTypes.JSON
    },
    status: {
        type: DataTypes.TINYINT(1),
        allowNull: false
    },
    createdBy: {
        type: DataTypes.STRING(100),
        allowNull: false,
        field: 'created_by'
    },
    createdDate: {
        type: DataTypes.DATE,
        field: 'created_date'
    },
    lastModifiedBy: {
        type: DataTypes.STRING(100),
        field: 'last_modified_by'
    },
    lastModifiedDate: {
        type: DataTypes.DATE,
        field: 'last_modified_date'
    }
}, {
    tableName: 'automation_report',
    timestamps: false
});

AutomationReport.belongsTo(Projects, { foreignKey: 'projectId', as: 'project' });

module.exports = AutomationReport;
