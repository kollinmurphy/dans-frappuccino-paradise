import db from "@database";
import { hash } from "argon2";
import wrapper, { AuthorizedHandler, authorizedWrapper, Handler, InvalidRequestError, NotFoundError } from "@utils/wrapper";
import { createToken } from "@utils/auth";

type CreateUserInput = {
  username: string;
  password: string;
}

const createUser: Handler<CreateUserInput> = async ({ body }) => {
  const { username, password } = body
  const exisiting = await db.Account.findOne({ where: { username } })
  if (exisiting)
    throw new InvalidRequestError('Username is already taken')
  const account = await db.Account.create({
    username,
    password: await hash(password),
    role: 'user',
  })
  const { password: _, ...userData } = account.get({ plain: true })
  return {
    ...userData,
    token: createToken(userData),
  }
}

export const post = wrapper(createUser)

type GetUserInput = {}

const getUser: AuthorizedHandler<GetUserInput> = async ({ user }) => {
  const account = await db.Account.findByPk(user.id)
  if (!account)
    throw new NotFoundError('Unable to find account')
  const orders = await db.Order.findAll({
    where: {
      accountId: account.id,
      paid: false,
      status: 'created',
    },
    include: [{
      model: db.OrderProduct,
      include: [{
        model: db.OrderProductIngredient,
        include: [db.Ingredient],
      }],
    }],
    order: [['createdAt', 'DESC']],
    limit: 1,
  })
  const order = orders.length > 0 ? orders[0] : null
  return { ...account.get({ plain: true }), order }
}

export const get = authorizedWrapper(getUser)
