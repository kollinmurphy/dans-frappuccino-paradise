import { addFunds } from "../../src/pages/api/accounts/funds";
import db from "../../database";
import { v4 as uuid } from "uuid";
import argon2 from "argon2";

describe("Add Funds", () => {
  let account: any;

  beforeAll(async () => {
    account = await db.Account.create({
      username: uuid(),
      password: await argon2.hash("password"),
      role: "user",
      balance: 0,
    });
  });

  beforeEach(async () => {
    await db.Account.update({ balance: 0 }, { where: { id: account.id } });
  });

  test("successfully adds funds", async () => {
    await addFunds({
      body: { amount: 1 },
      user: account,
      params: {},
    });
    const updatedUser = await db.Account.findByPk(account.id);
    expect(updatedUser.balance).toBe(1);
  });

  test("throws an error when user is not found", async () => {
    await expect(() =>
      addFunds({
        body: { amount: 1 },
        user: { ...account.get({ plain: true }), id: -1 },
        params: {},
      })
    ).rejects.toThrow("Unable to find account");
  });

  test("returns new data", async () => {
    const res = await addFunds({
      body: { amount: 100 },
      user: account,
      params: {},
    });
    expect(res.balance).toBe(100);
    expect(res.password).toBe(undefined);
  });
});
