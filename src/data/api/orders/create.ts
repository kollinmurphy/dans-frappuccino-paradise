import { Order } from "@data/types/order";
import runApiCall from "..";

const createOrder = async (): Promise<Order> =>
  runApiCall(
    {
      method: "POST",
      path: "/orders",
    },
  );

export default createOrder;
