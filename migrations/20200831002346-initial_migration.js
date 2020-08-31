'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
      queryInterface.createTable('Metrics', {
          id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
          },
          name: { 
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
              noWhiteSpace: function(value) {
                if (/\s/.test(value)) {
                  throw new Error('No whitespace allowed!')
                }
              }
            },
            unique: true
          },
          createdAt: {
            allowNull: false,
            type: Sequelize.DATE
          },
          updatedAt: {
            allowNull: false,
            type: Sequelize.DATE
          }
      }, {
          classMethods: {
              associate: function(models) {
                Metrics.hasMany(models.MetricValues)
              }
          }
      })

      queryInterface.createTable('MetricValues', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        value: { 
          type: Sequelize.FLOAT,
          allowNull: false
        },
        metricId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'Metrics', key: 'id' }
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
      }, {
        classMethods: {
            associate: function(models) {
              MetricValues.belongsTo(models.Metrics)
            }
        }
    });

  },

  down: async (queryInterface, Sequelize) => {
     queryInterface.dropTable('MetricValues');
     queryInterface.dropTable('Metrics');
  }
};
