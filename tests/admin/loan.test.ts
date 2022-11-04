import db from "@database";
import { CONFIG_STORE_BALANCE } from "@utils/db";
import { addFunds } from "../../src/pages/api/admin/loan";

describe("Admin Loan", () => {
  beforeEach(async () => {
    const config = await db.StoreConfig.findByPk(CONFIG_STORE_BALANCE);
    if (config) await config.update({ value: 0 });
    else await db.StoreConfig.create({ key: CONFIG_STORE_BALANCE, value: 0 });
  })

  it("should add funds", async () => {
    const amount = 100;
    const account = await db.Account.findOne();
    await addFunds({ body: { amount }, user: account as any, params: {} });
    const config = await db.StoreConfig.findByPk(CONFIG_STORE_BALANCE);
    expect(config.value).toEqual(amount);
  });

  it("should not add negative funds", async () => {
    const amount = -100;
    const account = await db.Account.findOne();
    await addFunds({ body: { amount }, user: account as any, params: {} });
    const config = await db.StoreConfig.findByPk(CONFIG_STORE_BALANCE);
    expect(config.value).toEqual(0);
  })
});
