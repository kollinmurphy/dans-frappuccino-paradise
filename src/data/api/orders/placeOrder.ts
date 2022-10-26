import runApiCall from "..";

const placeOrder = async (data: {
  orderId: number;
}): Promise<any> =>
  runApiCall({
    method: "PATCH",
    path: `/orders/${data.orderId}`,
  });

export default placeOrder;
