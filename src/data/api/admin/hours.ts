import runApiCall from "..";

export const payEmployees = async (): Promise<any> =>
  runApiCall({
    method: "POST",
    path: "/admin/hours",
  });
