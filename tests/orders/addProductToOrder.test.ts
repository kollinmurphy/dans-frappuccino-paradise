import db from "../../database";
import { v4 as uuid } from "uuid";
import argon2 from "argon2";
import { addProductToOrder } from "../../src/pages/api/orders/[orderId]/products/[productId]";

describe("Add Product To Order", () => {
  let account: any;
  let otherAccount: any;
  let order: any;
  let product: any;

  beforeAll(async () => {
    account = await db.Account.create({
      username: uuid(),
      password: await argon2.hash("password"),
      role: "user",
      balance: 0,
    });
    otherAccount = await db.Account.create({
      username: uuid(),
      password: await argon2.hash("password"),
      role: "user",
      balance: 0,
    });
    product = await db.Product.findOne({
      include: [{ model: db.ProductIngredient, include: [db.Ingredient] }],
    });
  });

  beforeEach(async () => {
    order = await db.Order.create({
      accountId: account.id,
      paid: false,
      status: "created",
    });
  });

  test("successfully adds product with no ingredients", async () => {
    const op = await addProductToOrder({
      user: account,
      body: { ingredients: [], size: "small" },
      params: { orderId: order.id, productId: product.id },
    });
    expect(op.orderId).toBe(order.id);
    expect(op.productId).toBe(product.id);
    expect(op.size).toBe("small");
    expect(op.OrderProductIngredients.length).toBe(0);
  });

  test("successfully adds ingredients", async () => {
    const ingredients = (await db.Ingredient.findAll({ limit: 3 })).map(
      (i) => ({ ingredientId: i.id, quantity: Math.floor(Math.random() * 10) })
    );
    const op = await addProductToOrder({
      user: account,
      body: { ingredients, size: "medium" },
      params: { orderId: order.id, productId: product.id },
    });
    expect(op.orderId).toBe(order.id);
    expect(op.productId).toBe(product.id);
    expect(op.size).toBe("medium");
    expect(op.OrderProductIngredients.length).toBe(ingredients.length);
  });

  test("throws forbidden error when adding to someone else's order", async () => {
    expect(() =>
      addProductToOrder({
        user: otherAccount,
        body: { ingredients: [], size: "small" },
        params: { orderId: order.id, productId: product.id },
      })
    ).rejects.toThrow("Insufficient permissions");
  });

  test("throws not found error when order does not exist", async () => {
    expect(() =>
      addProductToOrder({
        user: otherAccount,
        body: { ingredients: [], size: "small" },
        params: { orderId: -1, productId: product.id },
      })
    ).rejects.toThrow("order not found");
  });
});
