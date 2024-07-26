const { DataTypes } = require('sequelize');
const { sequelize } = require('../../database-connection/mysql-connection');
const auditingEntity = require('../models/AuditingEntity');
const User = require('../users/models/UserModel');
const Organization = require('../users/models/OrganizationModel');

const Projects = sequelize.define('Projects', {
    ...auditingEntity,
    name: {
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
    userId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        field: 'user_id',
        references: {
            model: User,
            key: 'id'
        }
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        field: 'status'
    },
}, {
    tableName: 'projects',
    timestamps: false // Enable automatic timestamping
});

Projects.belongsTo(Organization, { foreignKey: 'organizationId', as: 'organization' });
Projects.belongsTo(User, { foreignKey: 'userId', as: 'user' });

module.exports = Projects;
