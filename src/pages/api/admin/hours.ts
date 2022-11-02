import db from "@database";
import { CONFIG_STORE_BALANCE } from "@utils/db";
import { adminWrapper, AuthorizedHandler } from "@utils/wrapper";

type PayEmployeesInput = {};

const PAY_RATE_PER_MINUTE = 15 / 60;

export const payEmployees: AuthorizedHandler<
  PayEmployeesInput
> = async ({}) => {
  const hours = await db.Hours.findAll({
    where: {
      paid: false,
    },
  });
  const minutesWorked = hours.reduce((map, hour) => {
    const minutes = map.get(hour.accountId) || 0;
    map.set(hour.accountId, minutes + hour.minutesWorked);
    return map;
  }, new Map<number, number>());

  await db.sequelize.transaction(async (transaction) => {
    let totalPayout = 0;
    for (const [accountId, minutes] of minutesWorked.entries()) {
      const account = await db.Account.findByPk(accountId, { transaction });
      if (!account) {
        throw new Error(`Account ${accountId} not found`);
      }
      account.balance += minutes * PAY_RATE_PER_MINUTE;
      totalPayout += minutes * PAY_RATE_PER_MINUTE;
      await account.save({ transaction });
    }
    await Promise.all(
      hours.map((hour) => hour.update({ paid: true }, { transaction }))
    );
    const config = await db.StoreConfig.findByPk(CONFIG_STORE_BALANCE, {
      transaction,
    });
    if (!config) throw new Error("Store config not found");
    else {
      if (config.value < totalPayout)
        throw new Error("Not enough money in store");
      await config.update(
        { value: config.value - totalPayout },
        { transaction }
      );
    }
  });

  return hours;
};

export const post = adminWrapper(payEmployees);
