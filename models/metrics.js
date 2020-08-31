'use strict';
module.exports = (sequelize, DataTypes) => {
  const Metrics = sequelize.define("Metrics", {
    name: { 
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        noWhiteSpace: function(value) {
          if (/\s/.test(value)) {
            throw new Error('No whitespace allowed!')
          }
        }
      },
      unique: true
    }
  });
  return Metrics;
};