import db from "@database";
import { hash } from "argon2";
import wrapper, { Handler } from "@api/wrapper";

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
  return account
}

export const post = wrapper(createUser)
