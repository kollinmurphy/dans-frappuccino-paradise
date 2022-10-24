import runApiCall from "..";

export type UserSearchResult = {
  id: number;
  username: string;
  role: "user" | "employee" | "manger";
};

const searchUsers = async (data: { username: string }): Promise<UserSearchResult[]> =>
  runApiCall(
    {
      method: "POST",
      path: "/admin/users",
    },
    data
  );

export default searchUsers;
