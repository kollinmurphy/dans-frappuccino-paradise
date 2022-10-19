import { Account } from "@data/types/account";
import { Order } from "@data/types/order";
import runApiCall from "..";

const getUser = async (): Promise<Account & { order?: Order }> =>
  runApiCall({
    method: "GET",
    path: "/accounts",
  });

export default getUser;
