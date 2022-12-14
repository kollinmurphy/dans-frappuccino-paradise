import { OrderProduct } from "@data/types/order";
import runApiCall from "..";

const addProductToOrder = async (data: {
  orderId: number;
  productId: number;
  ingredients: Array<{
    ingredientId: number;
    quantity: number;
  }>;
  size: "small" | "medium" | "large";
  userId?: number;
}): Promise<OrderProduct> =>
  runApiCall({
    method: "POST",
    path: `/orders/${data.orderId}/products/${data.productId}`,
  }, {
    ingredients: data.ingredients,
    size: data.size,
    userId: data.userId,
  });

export default addProductToOrder;
