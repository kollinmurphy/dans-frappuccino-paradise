import { updateUserRole } from "../../src/pages/api/admin/users";
import db from "@database";
import argon2 from "argon2";
import { v4 as uuid } from "uuid";

describe("Admin Users", () => {
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
    await account.update({ role: "user" });
  });

  test("successfully updates user role", async () => {
    const res = await updateUserRole({
      body: { role: "manager", id: account.id },
      user: account,
      params: { id: account.id },
    });
    const newAccount = await db.Account.findByPk(account.id);
    expect(newAccount.role).toBe("manager");
  });
});
