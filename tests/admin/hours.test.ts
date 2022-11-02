import { payEmployees } from "../../src/pages/api/admin/hours";
import db from "@database";
import { v4 as uuid } from "uuid";
import argon2 from "argon2";
import { CONFIG_STORE_BALANCE } from "@utils/db";

describe("Pay Employees", () => {
  let account: any;
  let admin: any;

  beforeAll(async () => {
    account = await db.Account.create({
      username: uuid(),
      password: await argon2.hash("password"),
      role: "user",
      balance: 0,
    });
    admin = await db.Account.create({
      username: uuid(),
      password: await argon2.hash("password"),
      role: "manager",
      balance: 0,
    });
  });

  beforeEach(async () => {
    await db.Hours.destroy({ where: {} });
    await account.update({ balance: 0 });
    const config = await db.StoreConfig.findByPk(CONFIG_STORE_BALANCE);
    if (!config)
      await db.StoreConfig.create({ key: CONFIG_STORE_BALANCE, value: 1000 });
    else await config.update({ value: 1000 });
  });

  test("successfully pays employees and deducts from store balance", async () => {
    await db.Hours.create({
      accountId: account.id,
      minutesWorked: 60,
      paid: false,
    });
    await payEmployees({
      body: {},
      params: {},
      user: admin,
    });
    const acc = await db.Account.findByPk(account.id);
    expect(acc.balance).toBe(15);
    const config = await db.StoreConfig.findByPk(CONFIG_STORE_BALANCE);
    expect(config.value).toBe(985);
    const hours = await db.Hours.findAll({ where: { accountId: account.id } });
    expect(hours[0].paid).toBe(true);
  });
});
