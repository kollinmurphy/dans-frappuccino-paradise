import { Account } from "@data/types/account";
import runApiCall from "..";

const createAccount = async (data: { username: string; password: string }): Promise<Account & { token: string }> =>
  runApiCall(
    {
      method: "POST",
      path: "/accounts",
    },
    data
  );

export default createAccount;
