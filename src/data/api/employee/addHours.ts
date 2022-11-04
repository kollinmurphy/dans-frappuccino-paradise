import runApiCall from "..";

const addHours = async (data: {
  hoursId: number;
  userId?: number;
}): Promise<any> =>
  runApiCall(
    {
      method: "PATCH",
      path: `/hours/${data.hoursId}`,
    },
    { userId: data.userId }
  );

export default addHours;
