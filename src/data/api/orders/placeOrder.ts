import runApiCall from "..";

const placeOrder = async (data: {
  orderId: number;
  userId?: number;
}): Promise<any> =>
  runApiCall(
    {
      method: "PATCH",
      path: `/orders/${data.orderId}`,
    },
    { userId: data.userId }
  );

export default placeOrder;
