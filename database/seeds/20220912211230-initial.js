'use strict';

const argon2 = require('argon2')
const hash = (password) => argon2.hash(password)
const db = require('../index')

module.exports = {
  async up (queryInterface, Sequelize) {
    const count = await db.Account.count()
    if (count > 0) return console.log('skipping seed')
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
