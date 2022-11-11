/* @jsxImportSource solid-js */

import addProductToOrder from "@data/api/orders/addProduct";
import createOrder from "@data/api/orders/create";
import placeOrder from "@data/api/orders/placeOrder";
import { Order } from "@data/types/order";
import { numToPrice } from "@utils/strings";
import { createSignal, For } from "solid-js";
import ErrorAlert from "./ErrorAlert";

type Props = {
  orders: Array<Order>;
};

const makeClassList = (order: Order) => ({
  "bg-green-100": order.status === "fulfilled",
  "bg-red-100": order.status === "cancelled",
  "bg-yellow-100": order.status === "purchased",
});

export default function OrderHistory(props: Props) {
  const [error, setError] = createSignal<string | null>(null)
  
  const handleReorder = async (order: Order) => {
    setError(null);
    try {
      const newOrder = await createOrder();
      await addProductToOrder({
        orderId: newOrder.id,
        productId: order.OrderProducts[0].Product.id,
        size: order.OrderProducts[0].size,
        ingredients: order.OrderProducts[0].OrderProductIngredients.filter(i => !i.Ingredient.hidden).map((i) => ({
          ingredientId: i.Ingredient.id,
          quantity: i.quantity,
        })),
      });
      await placeOrder({ orderId: newOrder.id });
      window.location.href = "/account?purchased=true";
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2 class="text-xl mb-4 font-bold">Order History</h2>
      <ErrorAlert error={error()} />
      <table class="table">
        <thead>
          <tr>
            <th>Order</th>
            <th>Status</th>
            <th>Date</th>
            <th>Total</th>
            <th>Purchase</th>
            <th>Reorder</th>
          </tr>
        </thead>
        <tbody>
          <For each={props.orders} fallback={<tr><td colspan={6}>No orders yet!</td></tr>}>
            {(order) => (
            <tr>
              <td classList={makeClassList(order)}>#{order.id}</td>
              <td classList={makeClassList(order)} class='font-bold'>{order.status}</td>
              <td classList={makeClassList(order)}>
                {(order.createdAt as unknown as Date).toLocaleDateString()}{" "}
                {(order.createdAt as unknown as Date).toLocaleTimeString()}
              </td>
              <td classList={makeClassList(order)} class="text-lg">{numToPrice(order.total || 0)}</td>
              <td classList={makeClassList(order)}>
                {order.OrderProducts.map((op) => (
                  <div>
                    <div class="font-bold">{op.Product.name}</div>
                    <ul class="ml-6">
                      {op.OrderProductIngredients.map((opi) => (
                        <li class="list-disc">
                          {opi.Ingredient.name} x {opi.quantity}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </td>
              <td classList={makeClassList(order)}>
                <button class="btn btn-primary" onClick={() => handleReorder(order)}>
                  Order Again
                </button>
              </td>
            </tr>
          )}
          </For>
        </tbody>
      </table>
    </div>
  );
}
