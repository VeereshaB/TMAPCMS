const { DataTypes } = require('sequelize');
const baseEntity=require('./BaseEntity');

const auditingEntity = {
  ...baseEntity,
  createdBy: {
    type: DataTypes.STRING(100),
    field: 'created_by'
  },
  createdDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    field: 'created_date'
  },
  lastModifiedBy: {
    type: DataTypes.STRING(100),
    field: 'last_modified_by'
  },
  lastModifiedDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    field: 'last_modified_date'
  },
 
};

module.exports = auditingEntity;
