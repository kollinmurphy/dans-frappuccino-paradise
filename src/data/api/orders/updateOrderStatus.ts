import runApiCall from "..";

const updateOrderStatus = async (data: {
  orderId: number;
}): Promise<any> =>
  runApiCall({
    method: "PATCH",
    path: `/orders/${data.orderId}/status`,
  });

export default updateOrderStatus;
