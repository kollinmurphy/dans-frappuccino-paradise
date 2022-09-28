'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('Hours', {
      fields: ['accountId'],
      type: 'foreign key',
      name: 'HoursFK-Account',
      references: {
        table: 'Accounts',
        field: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('Hours', 'HoursFK-Account')
  }
};
