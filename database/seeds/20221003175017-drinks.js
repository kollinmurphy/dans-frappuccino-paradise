'use strict';

const addTimestamps = (list) => list.map(d => ({
  ...d,
  createdAt: new Date(),
  updatedAt: new Date(),
}))

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Ingredients', addTimestamps([
      { name: "Small Cup", price: 0.10, hidden: true },
      { name: "Medium Cup", price: 0.15, hidden: true },
      { name: "Large Cup", price: 0.20, hidden: true },
      { name: "Straws", price: 0.01, hidden: true },
      { name: "Lids", price: 0.05, hidden: true },
      { name: "Cup sleeve", price: 0.03, hidden: true },
      { name: "Coffee bean packet", price: 0.10, hidden: true },
      { name: "Pumpkin Spice", price: 0.10, hidden: false },
      { name: "Peppermint", price: 0.10, hidden: false },
      { name: "Espresso", price: 0.10, hidden: false },
      { name: "Vanilla", price: 0.10, hidden: false },
      { name: "Mocha", price: 0.10, hidden: false },
      { name: "Caramel", price: 0.10, hidden: false },
      { name: "Hazelnut", price: 0.10, hidden: false },
      { name: "Raspberry", price: 0.10, hidden: false },
      { name: "Blueberry", price: 0.10, hidden: false },
      { name: "Strawberry", price: 0.10, hidden: false },
      { name: "Apple", price: 0.10, hidden: false },
      { name: "Wheatgrass", price: 0.10, hidden: false },
      { name: "Matcha", price: 0.10, hidden: false },
      { name: "Whipped cream", price: 0.10, hidden: false },
    ]))
    await queryInterface.bulkInsert('Products', addTimestamps([
      { name: 'Coffee Frap', imageUrl: '', isDeleted: false },
      { name: 'Pumpkin Spice Frap', imageUrl: '', isDeleted: false },
      { name: 'Mocha Frap', imageUrl: '', isDeleted: false },
      { name: 'Raspberry Frap', imageUrl: '', isDeleted: false },
      { name: 'Caramel Frap', imageUrl: '', isDeleted: false },
      { name: 'Matcha Frap', imageUrl: '', isDeleted: false },
    ]))
    const ingredients = [4, 5, 6, 7]
    const recipes = new Map()
    recipes.set(1, [...ingredients]) // Coffee
    recipes.set(2, [...ingredients, 8]) // Pumpkin Spice
    recipes.set(3, [...ingredients, 12]) // Mocha
    recipes.set(4, [...ingredients, 15]) // Raspberry
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
