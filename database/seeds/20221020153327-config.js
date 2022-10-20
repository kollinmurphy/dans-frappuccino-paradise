'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('StoreConfig', [
      { key: 'balance', value: 10000 },
      { key: 'percentPriceModifier', value: 1.50 },
      { key: 'smallBasePrice', value: 2.00 },
      { key: 'mediumBasePrice', value: 4.00 },
      { key: 'largeBasePrice', value: 5.00 },
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
