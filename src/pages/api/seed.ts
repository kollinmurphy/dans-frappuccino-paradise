import db from "@database";
import { hash } from "argon2";

const addTimestamps = (list) =>
  list.map((d) => ({
    ...d,
    createdAt: new Date(),
    updatedAt: new Date(),
  }));

export const get = async () => {
  try {
    if ((await db.Account.count() === 0)) {
      await db.Account.bulkCreate([
        {
          username: "dan",
          role: "manager",
          password: await hash("password123"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: "employee",
          role: "employee",
          password: await hash("password123"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: "user",
          role: "user",
          password: await hash("password123"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
    }
    if ((await db.Ingredient.count()) === 0) {
      await db.Ingredient.bulkCreate(
        addTimestamps([
          { name: "Small Cup", price: 0.1, hidden: true, quantityOnHand: 10 },
          { name: "Medium Cup", price: 0.15, hidden: true, quantityOnHand: 10 },
          { name: "Large Cup", price: 0.2, hidden: true, quantityOnHand: 10 },
          { name: "Straws", price: 0.01, hidden: true, quantityOnHand: 10 },
          { name: "Lids", price: 0.05, hidden: true, quantityOnHand: 10 },
          { name: "Cup sleeve", price: 0.03, hidden: true, quantityOnHand: 10 },
          {
            name: "Coffee bean packet",
            price: 0.08,
            hidden: true,
            quantityOnHand: 10,
          },
          {
            name: "Pumpkin Spice",
            price: 0.2,
            hidden: false,
            quantityOnHand: 10,
          },
          { name: "Peppermint", price: 0.15, hidden: false, quantityOnHand: 10 },
          { name: "Espresso", price: 0.15, hidden: false, quantityOnHand: 10 },
          { name: "Vanilla", price: 0.08, hidden: false, quantityOnHand: 10 },
          { name: "Mocha", price: 0.2, hidden: false, quantityOnHand: 10 },
          { name: "Caramel", price: 0.25, hidden: false, quantityOnHand: 10 },
          { name: "Hazelnut", price: 0.2, hidden: false, quantityOnHand: 10 },
          { name: "Raspberry", price: 0.15, hidden: false, quantityOnHand: 10 },
          { name: "Blueberry", price: 0.13, hidden: false, quantityOnHand: 10 },
          { name: "Strawberry", price: 0.12, hidden: false, quantityOnHand: 10 },
          { name: "Apple", price: 0.05, hidden: false, quantityOnHand: 10 },
          { name: "Wheatgrass", price: 0.2, hidden: false, quantityOnHand: 10 },
          { name: "Matcha", price: 0.2, hidden: false, quantityOnHand: 10 },
          {
            name: "Whipped cream",
            price: 0.15,
            hidden: false,
            quantityOnHand: 10,
          },
        ])
      );
    }
    if ((await db.Product.count()) === 0) {
      await db.Product.bulkCreate(
        addTimestamps([
          {
            name: "Coffee Frap",
            imageUrl: "/assets/coffee.jpg",
            isDeleted: false,
          },
          {
            name: "Pumpkin Spice Frap",
            imageUrl: "/assets/pumpkinspice.jpg",
            isDeleted: false,
          },
          { name: "Mocha Frap", imageUrl: "/assets/mocha.jpg", isDeleted: false },
          {
            name: "Raspberry Frap",
            imageUrl: "/assets/raspberry.jpg",
            isDeleted: false,
          },
          {
            name: "Caramel Frap",
            imageUrl: "/assets/caramel.jpg",
            isDeleted: false,
          },
          {
            name: "Matcha Frap",
            imageUrl: "/assets/matcha.jpg",
            isDeleted: false,
          },
        ])
      );
    }
    if ((await db.ProductIngredient.count()) === 0) {
      const ingredients = [4, 5, 6, 7];
      const recipes = new Map();
      recipes.set(1, [...ingredients]); // Coffee
      recipes.set(2, [...ingredients, 8, 21]); // Pumpkin Spice
      recipes.set(3, [...ingredients, 12, 21]); // Mocha
      recipes.set(4, [...ingredients, 15, 21]); // Raspberry
      recipes.set(5, [...ingredients, 13, 21]); // Caramel
      recipes.set(6, [...ingredients, 20, 21]); // Matcha
      for (const productId of [...recipes.keys()]) {
        const ingredients = recipes.get(productId);
        await db.ProductIngredient.bulkCreate(
          ingredients.map((i) => ({
            ingredientId: i,
            productId,
            createdAt: new Date(),
            updatedAt: new Date(),
          }))
        );
      }
    }
    if ((await db.StoreConfig.count()) === 0) {
      await db.StoreConfig.bulkCreate([
        { key: "balance", value: 10000 },
        { key: "percentPriceModifier", value: 1.5 },
        { key: "smallBasePrice", value: 2.0 },
        { key: "mediumBasePrice", value: 4.0 },
        { key: "largeBasePrice", value: 5.0 },
      ]);
    }
    return new Response('', { status: 200 });
  } catch (err) {
    console.log(err); 
    return new Response('Error', { status: 500 });
  }
};
