import { AccountRole } from "@data/types/account";
import runApiCall from "..";

const updateUserRole = async (data: { id: number; role: AccountRole }): Promise<any> =>
  runApiCall(
    {
      method: "PATCH",
      path: "/admin/users",
    },
    data
  );

export default updateUserRole;
