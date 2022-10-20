'use strict';

const db = require('../index')

const addTimestamps = (list) => list.map(d => ({
  ...d,
  createdAt: new Date(),
  updatedAt: new Date(),
}))

module.exports = {
  async up (queryInterface, Sequelize) {
    const count = await db.Ingredient.count()
    if (count > 0) return console.log('skipping seed')
    await queryInterface.bulkInsert('Ingredients', addTimestamps([
      { name: "Small Cup", price: 0.10, hidden: true, quantityOnHand: 10 },
      { name: "Medium Cup", price: 0.15, hidden: true, quantityOnHand: 10 },
      { name: "Large Cup", price: 0.20, hidden: true, quantityOnHand: 10 },
      { name: "Straws", price: 0.01, hidden: true, quantityOnHand: 10 },
      { name: "Lids", price: 0.05, hidden: true, quantityOnHand: 10 },
      { name: "Cup sleeve", price: 0.03, hidden: true, quantityOnHand: 10 },
      { name: "Coffee bean packet", price: 0.08, hidden: true, quantityOnHand: 10 },
      { name: "Pumpkin Spice", price: 0.20, hidden: false, quantityOnHand: 10 },
      { name: "Peppermint", price: 0.15, hidden: false, quantityOnHand: 10 },
      { name: "Espresso", price: 0.15, hidden: false, quantityOnHand: 10 },
      { name: "Vanilla", price: 0.08, hidden: false, quantityOnHand: 10 },
      { name: "Mocha", price: 0.20, hidden: false, quantityOnHand: 10 },
      { name: "Caramel", price: 0.25, hidden: false, quantityOnHand: 10 },
      { name: "Hazelnut", price: 0.20, hidden: false, quantityOnHand: 10 },
      { name: "Raspberry", price: 0.15, hidden: false, quantityOnHand: 10 },
      { name: "Blueberry", price: 0.13, hidden: false, quantityOnHand: 10 },
      { name: "Strawberry", price: 0.12, hidden: false, quantityOnHand: 10 },
      { name: "Apple", price: 0.05, hidden: false, quantityOnHand: 10 },
      { name: "Wheatgrass", price: 0.20, hidden: false, quantityOnHand: 10 },
      { name: "Matcha", price: 0.20, hidden: false, quantityOnHand: 10 },
      { name: "Whipped cream", price: 0.15, hidden: false, quantityOnHand: 10 },
    ]))
    await queryInterface.bulkInsert('Products', addTimestamps([
      { name: 'Coffee Frap', imageUrl: '/assets/coffee.jpg', isDeleted: false },
      { name: 'Pumpkin Spice Frap', imageUrl: '/assets/pumpkinspice.jpg', isDeleted: false },
      { name: 'Mocha Frap', imageUrl: '/assets/mocha.jpg', isDeleted: false },
      { name: 'Raspberry Frap', imageUrl: '/assets/raspberry.jpg', isDeleted: false },
      { name: 'Caramel Frap', imageUrl: '/assets/caramel.jpg', isDeleted: false },
      { name: 'Matcha Frap', imageUrl: '/assets/matcha.jpg', isDeleted: false },
    ]))
    const ingredients = [4, 5, 6, 7]
    const recipes = new Map()
    recipes.set(1, [...ingredients]) // Coffee
    recipes.set(2, [...ingredients, 8, 21]) // Pumpkin Spice
    recipes.set(3, [...ingredients, 12, 21]) // Mocha
    recipes.set(4, [...ingredients, 15, 21]) // Raspberry
    recipes.set(5, [...ingredients, 13, 21]) // Caramel
    recipes.set(6, [...ingredients, 20, 21]) // Matcha
    for (const productId of [...recipes.keys()]) {
      const ingredients = recipes.get(productId)
      await queryInterface.bulkInsert('ProductIngredients', ingredients.map(i => ({
        ingredientId: i,
        productId,
        createdAt: new Date(),
        updatedAt: new Date(),
      })))
    }
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
