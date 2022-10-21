import db from "@database";
import { CONFIG_STORE_BALANCE } from "@utils/db";
import { adminWrapper, AuthorizedHandler, authorizedWrapper, NotFoundError } from "@utils/wrapper";

type AddFundsInput = {
  amount: number;
}

export const addFunds: AuthorizedHandler<AddFundsInput> = async ({ body, user }) => {
  const { amount } = body
  
  const config = await db.StoreConfig.findByPk(CONFIG_STORE_BALANCE)
  if (amount > 0)
    if (!config)
      await db.StoreConfig.create({key:CONFIG_STORE_BALANCE,value:amount})
    else
      await config.update({value:config.value+amount})
  
}

export const post = adminWrapper(addFunds)
