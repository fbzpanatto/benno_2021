'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('permissions', {
      person_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: false,
        allowNull: false,
        references: {
          model: 'users',
          key: 'person_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      crud_persons: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      crud_grades: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      crud_classes: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      crud_periods: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      crud_subjects: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      crud_permissions: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      crud_users: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      },      
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('permissions')
  }
};
