'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('OrderProductIngredients', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      orderProductId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      productIngredientId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('OrderProductIngredients')
  }
};
