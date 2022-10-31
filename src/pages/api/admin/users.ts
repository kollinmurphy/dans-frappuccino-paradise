import { AccountRole } from "@data/types/account";
import db from "@database";
import { adminWrapper, AuthorizedHandler, employeeWrapper } from "@utils/wrapper";
import { Op } from "sequelize";

type SearchUsersInput = {
  username: string;
};

export const searchUsers: AuthorizedHandler<SearchUsersInput> = async ({
  body,
}) => {
  const { username } = body;
  const users = await db.Account.findAll({
    where: { username: { [Op.like]: `%${username}%` } },
    attributes: ["id", "username", "role", "balance"],
    limit: 5,
  });
  return users;
};

export const post = employeeWrapper(searchUsers);

type UpdateUserRoleInput = {
  id: number;
  role: AccountRole;
};

export const updateUserRole: AuthorizedHandler<UpdateUserRoleInput> = async ({
  body,
}) => {
  await db.Account.update({ role: body.role }, { where: { id: body.id } });
};

export const patch = adminWrapper(updateUserRole);
