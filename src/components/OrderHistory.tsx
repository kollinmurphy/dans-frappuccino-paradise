/* @jsxImportSource solid-js */

import { Order } from "@data/types/order";
import { numToPrice } from "@utils/strings";

type Props = {
  orders: Array<Order>;
};

const makeClassList = (order: Order) => ({
  "bg-green-100": order.status === "fulfilled",
  "bg-red-100": order.status === "cancelled",
  "bg-yellow-100": order.status === "purchased",
});

export default function OrderHistory(props: Props) {
  return (
    <div>
      <h2 class="text-xl mb-4 font-bold">Order History</h2>
      <table class="table">
        <thead>
          <tr>
            <th>Order</th>
            <th>Status</th>
            <th>Date</th>
            <th>Total</th>
            <th>Purchase</th>
          </tr>
        </thead>
        <tbody>
          {props.orders.map((order) => (
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
