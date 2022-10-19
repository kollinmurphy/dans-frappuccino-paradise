import db from "@database";
import { AuthorizedHandler, authorizedWrapper, NotFoundError } from "@utils/wrapper";

type AddFundsInput = {
  amount: number;
}

export const addFunds: AuthorizedHandler<AddFundsInput> = async ({ body, user }) => {
  const { amount } = body
  const account = await db.Account.findByPk(user.id)
  if (!account)
    throw new NotFoundError('Unable to find account')
  await account.update({
    balance: (account.balance || 0) + amount,
  })
  const { password: _, ...data } = account.get({ plain: true })
  return data
}

export const post = authorizedWrapper(addFunds)
