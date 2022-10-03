'use strict';

const keys = [
  { from: 'OrderProductIngredients', column: 'orderProductId', to: 'OrderProducts' },
  { from: 'AccountFavorites', column: 'accountId', to: 'Accounts' },
  { from: 'AccountFavorites', column: 'orderProductId', to: 'OrderProducts' },
  { from: 'OrderProducts', column: 'orderId', to: 'Orders' },
  { from: 'OrderProducts', column: 'productId', to: 'Products' },
  { from: 'ProductIngredients', column: 'productId', to: 'Products' },
  { from: 'ProductIngredients', column: 'ingredientId', to: 'Ingredients' },
]

module.exports = {
  async up (queryInterface, Sequelize) {
    for (const { from, column, to } of keys)
      await queryInterface.addConstraint(from, {
        fields: [column],
        type: 'foreign key',
        name: `${from}FK-${to}`,
        references: {
          table: to,
          field: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      })
  },

  async down (queryInterface, Sequelize) {
    for (const { from, to } of keys)
      await queryInterface.removeConstraint(from, `${from}FK-${to}`)
  }
};
