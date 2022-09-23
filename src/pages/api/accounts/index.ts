import db from "@database";
import { hash } from "argon2";
import wrapper, { Handler } from "@utils/wrapper";
import { createToken } from "@utils/auth";

type CreateUserInput = {
  username: string;
  password: string;
}

const createUser: Handler<CreateUserInput> = async ({ body }) => {
  const { username, password } = body
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
