import db from "@database";
import { verify } from "argon2";
import wrapper, { ForbiddenError, Handler, NotFoundError } from "@utils/wrapper";
import { createToken } from "@utils/auth";

type LoginInput = {
  username: string;
  password: string;
}

export const login: Handler<LoginInput> = async ({ body }) => {
  const { username, password } = body
  const account = await db.Account.findOne({
    where: { username, isDeleted: false },
  })
  if (!account)
    throw new NotFoundError('Unable to find account')
  if (!(await verify(account.password, password)))
    throw new ForbiddenError('Invalid credentials')
  const { password: _, ...userData } = account.get({ plain: true })
  return {
    ...userData,
    token: createToken(userData),
  }
}

export const post = wrapper(login)
