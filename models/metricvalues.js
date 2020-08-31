'use strict';
module.exports = (sequelize, DataTypes) => {
  const MetricValues = sequelize.define("MetricValues", {
      value: { 
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      metricId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'Metrics', key: 'id' }
      }
  });
  return MetricValues;
};