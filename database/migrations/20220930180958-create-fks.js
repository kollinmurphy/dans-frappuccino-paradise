'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('OrderProductIngredients', {
      fields: ['orderProductId'],
      type: 'foreign key',
      name: 'OrderProductIngredientsFK-OrderProduct',
      references: {
        table: 'Accounts',
        field: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('OrderProductIngredients', 'OrderProductIngredientsFK-OrderProduct')
    
  }
};
