import { Account } from "@data/types/account";
import runApiCall from "..";

const takeLoan = async (data: { amount: number }): Promise<any> =>
  runApiCall(
    {
      method: "POST",
      path: "/admin/loan",
    },
    data
  );

export default takeLoan;
