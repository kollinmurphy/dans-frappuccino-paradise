'use strict';

const argon2 = require('argon2')
const hash = (password) => argon2.hash(password)

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Accounts', [
      {
        username: 'dan',
        role: 'manager',
        password: await hash('password123'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'employee',
        role: 'employee',
        password: await hash('password123'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'user',
        role: 'user',
        password: await hash('password123'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
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
