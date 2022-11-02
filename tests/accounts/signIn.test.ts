import db from "../../database";
import { v4 as uuid } from "uuid";
import argon2 from "argon2";
import { login } from "../../src/pages/api/accounts/signIn";

describe("Sign In", () => {
    let account: any;

    beforeAll(async () => {
        account = await db.Account.create({
          username: uuid(),
          password: await argon2.hash("password"),
          role: "user",
          balance: 0,
        });
    });

    test("successfully log in", async () => {
        const result = await login({
            body: { username: account.username, password: 'password'},
            params: {},
        })
        expect(result.token).toBeDefined()
        expect(result.username).toBe(account.username)
    })


})