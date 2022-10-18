import { Account } from "@data/types/account";
import runApiCall from "..";

const addFunds = async (data: { amount: number }): Promise<Omit<Account, 'password'>> =>
  runApiCall(
    {
      method: "POST",
      path: "/accounts/funds",
    },
    data
  );

export default addFunds;
