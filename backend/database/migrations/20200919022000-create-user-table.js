'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('user', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      firstName: {
          type: Sequelize.STRING(50),
          allowNull: false,
          field: "first_name"
      },
      lastName: {
          type: Sequelize.STRING(50),
          allowNull: false,
          field: "last_name"
      },
      email: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        field: "created_at"
      },
      updatedAt: {
        type: Sequelize.DATE,
        field: "updated_at",
      }
    });
  },

  down: async (queryInterface) => {
     await queryInterface.dropTable('user');
  }
};
