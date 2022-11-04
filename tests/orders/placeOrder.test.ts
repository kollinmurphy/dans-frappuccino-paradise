import db from "@database";
import { v4 as uuid } from "uuid";
import argon2 from "argon2";
import { placeOrder } from "../../src/pages/api/orders/[orderId]/index";
import { CONFIG_STORE_BALANCE } from "@utils/db";

describe("Place Order", () => {
  let order: any;
  let account: any;
  let product: any;

  beforeAll(async () => {
    account = await db.Account.create({
      username: uuid(),
      password: await argon2.hash("password"),
      role: "user",
      balance: 1000,
    });
    await db.Ingredient.update({ quantityOnHand: 1000 }, { where: {} });
    product = await db.Product.findOne({
      include: [
        {
          model: db.ProductIngredient,
          include: [db.Ingredient],
        },
      ],
    });
  });

  beforeEach(async () => {
    order = await db.Order.create({
      accountId: account.id,
      status: "created",
      paid: false,
    });
    await db.OrderProduct.create({
      orderId: order.id,
      productId: product.id,
      size: "small",
    });
    await account.update({ balance: 1000 });
    const config = await db.StoreConfig.findByPk(CONFIG_STORE_BALANCE);
    await config.update({ value: 0 });
  });

  test("insufficient funds", async () => {
    await account.update({ balance: 0 });
    await expect(() =>
      placeOrder({
        params: { orderId: order.id },
        user: account,
        body: {},
      })
    ).rejects.toThrow("Insufficient funds.");
  });

  test("successfully places order", async () => {
    const res = await placeOrder({
      params: { orderId: order.id },
      user: account,
      body: {},
    });
    expect(res.success).toBe(true);
    expect(res.total).toBe(3.41);
    const newAccount = await db.Account.findByPk(account.id);
    expect(newAccount.balance).toBe(996.59);
    const storeBalance = await db.StoreConfig.findByPk(CONFIG_STORE_BALANCE);
    expect(storeBalance.value).toBe(3.41);
  });

  test("fails when out of stock", async () => {
    await db.Ingredient.update({ quantityOnHand: 0 }, { where: {} });
    await expect(() =>
      placeOrder({
        params: { orderId: order.id },
        user: account,
        body: {},
      })
    ).rejects.toThrow("Oh no! Looks like we're out of stock");
  });
});
