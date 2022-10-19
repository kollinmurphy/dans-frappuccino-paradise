/* @jsxImportSource solid-js */

import { Ingredient } from "@data/types/product";
import { createSignal } from "solid-js";

type Props = {
  ingredients: Array<Ingredient>;
};

export default function Inventory(props: Props) {
  const [order, setOrder] = createSignal<Map<number, number>>(new Map());

  const totalCost = () => {
    return [...order().entries()].reduce((sum, [id, quanity]) => {
      const cost = props.ingredients.find((i) => i.id === id)?.price;
      if (!cost) return sum;
      return sum + quanity * cost;
    }, 0);
  };

  return (
    <div>
      <table class="table table-zebra table-compact w-full my-4">
        <thead>
          <tr>
            <th class='text-center'>Ingredient</th>
            <th class='text-center'>Quantity</th>
            <th class='text-center'>Price Per Unit</th>
            <th class='text-center'>Order Quantity</th>
            <th class='text-center'>Cost</th>
          </tr>
        </thead>
        <tbody>
          {props.ingredients.map((ingredient) => (
            <tr>
              <td class='font-bold'>{ingredient.name}</td>
              <td class='text-center'>{ingredient.quantityOnHand}</td>
              <td class='text-center'>${ingredient.price.toFixed(2)}</td>
              <td class='text-center'>
                <input
                  type="number"
                  class="input input-bordered input-sm"
                  value={order().get(ingredient.id) || 0}
                  onChange={(e) => {
                    const newOrder = new Map(order());
                    newOrder.set(ingredient.id, e.currentTarget.valueAsNumber);
                    setOrder(newOrder);
                  }}
                  min={0}
                />
              </td>
              <td class='text-center'>
                ${((order().get(ingredient.id) || 0) * ingredient.price).toFixed(2)}
              </td>
            </tr>
          ))}
          <tr>
            <th>Total cost</th>
            <td></td>
            <td>${totalCost().toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
