/* @jsxImportSource solid-js */

import updateOrderStatus from "@data/api/orders/updateOrderStatus";
import { Order } from "@data/types/order";
import { Show } from "solid-js";

type Props = {
  hours: Array<Order>;
};

export default function HoursLog(props: Props) {
  return (
    <div>
      <h2 class="text-2xl my-4 font-bold">Worked Hours</h2>
      {/* <table class="table table-zebra">
        <thead>
          <tr>
            <th>Order</th>
            <th>Date</th>
            <th>Total</th>
            <th>Purchase</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <Show when={props.orders.length > 0} fallback={(
            <tr>
              <td colspan="5">No unfulfilled orders!</td>
            </tr>
          )}>
            {props.orders.map((order) => (
              <tr>
                <td>#{order.id}</td>
                <td>
                  {(order.createdAt as unknown as Date).toLocaleDateString()}{" "}
                  {(order.createdAt as unknown as Date).toLocaleTimeString()}
                </td>
                <td class="text-lg">{numToPrice(order.total || 0)}</td>
                <td>
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
                <td>
                  <button
                    class="btn btn-primary"
                    onClick={async () => {
                      await updateOrderStatus({ orderId: order.id });
                      location.reload();
                    }}
                  >
                    Fulfill Order
                  </button>
                </td>
              </tr>
            ))}
          </Show>
        </tbody>
      </table> */}
    </div>
  );
}
