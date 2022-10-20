/* @jsxImportSource solid-js */

import ErrorAlert from "@components/ErrorAlert";
import { placeIngredientOrder } from "@data/api/ingredients";
import { Ingredient } from "@data/types/product";
import { numToPrice } from "@utils/strings";
import { createSignal } from "solid-js";

type Props = {
  ingredients: Array<Ingredient>;
};

export default function Inventory(props: Props) {
  const [order, setOrder] = createSignal<Map<number, number>>(new Map());
  const [error, setError] = createSignal<string | null>(null);

  const totalCost = () => {
    return [...order().entries()].reduce((sum, [id, quanity]) => {
      const cost = props.ingredients.find((i) => i.id === id)?.price;
      if (!cost) return sum;
      return sum + quanity * cost;
    }, 0);
  };

  const handlePlaceOrder = async () => {
    try {
      await placeIngredientOrder(
        [...order().entries()].map(([id, quantity]) => ({ id, quantity }))
      );
      location.reload();
    } catch (err) {
      setError(err.message || 'Something unexpected happened')
    }
  };

  return (
    <div>
      <table class="table table-zebra table-compact w-full my-4">
        <thead>
          <tr>
            <th class="text-center">Ingredient</th>
            <th class="text-center">Quantity</th>
            <th class="text-center">Price Per Unit</th>
            <th class="text-center">Order Quantity</th>
            <th class="text-center">Cost</th>
          </tr>
        </thead>
        <tbody>
          {props.ingredients.map((ingredient) => (
            <tr>
              <td class="font-bold">{ingredient.name}</td>
              <td class="text-center">{ingredient.quantityOnHand}</td>
              <td class="text-center">{numToPrice(ingredient.price)}</td>
              <td class="text-center">
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
              <td class="text-center">
                {numToPrice((order().get(ingredient.id) || 0) * ingredient.price)}
              </td>
            </tr>
          ))}
          <tr>
            <th>Total cost</th>
            <td></td>
            <td></td>
            <td colSpan={2}>
              <div class="flex flex-row gap-3 items-center justify-end">
                <div>{numToPrice(totalCost())}</div>
                <button class="btn btn-primary" onClick={handlePlaceOrder}>
                  Place Order
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <ErrorAlert error={error()} />
    </div>
  );
}
