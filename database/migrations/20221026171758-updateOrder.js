'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Orders', 'status', {
      type: Sequelize.ENUM('created' | 'purchased' | 'cancelled' | 'fulfilled'),
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Orders', 'status', {
      type: Sequelize.ENUM('created' | 'cancelled' | 'fulfilled'),
      allowNull: false,
    });
  }
};
