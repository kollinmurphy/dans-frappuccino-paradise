import { Account } from "@data/types/account";
import runApiCall from "..";

const signIn = async (data: { username: string; password: string }): Promise<Account & { token: string }> =>
  runApiCall(
    {
      method: "POST",
      path: "/accounts/signIn",
    },
    data
  );

export default signIn;
