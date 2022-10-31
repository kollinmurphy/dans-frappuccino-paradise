import { Order } from "@data/types/order";
import runApiCall from "..";

const createOrder = async (userId?: number): Promise<Order> =>
  runApiCall(
    {
      method: "POST",
      path: "/orders",
    },
    { userId },
  );

export default createOrder;
