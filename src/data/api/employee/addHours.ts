import runApiCall from "..";

const addHours = async (data: {
  minutes: number;
}): Promise<any> =>
  runApiCall(
    {
      method: "POST",
      path: '/employee/hours',
    },
    { minutes: data.minutes }
  );

export default addHours;
