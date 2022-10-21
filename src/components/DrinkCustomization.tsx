/* @jsxImportSource solid-js */

import { Ingredient, Product } from "@data/types/product"
import { createEffect, createSignal, Show } from "solid-js";

type Props = {
  product: Product;
  allIngredients: Array<Ingredient>;
}

type DrinkIngredient = Pick<Ingredient, 'id' | 'name' | 'price' | 'hidden'> & { quantity: number };

export default function DrinkCustomization(props: Props) {
  const [ingredients, setIngredients] = createSignal<DrinkIngredient[]>(props.product.ProductIngredients.map(pi => ({
    id: pi.Ingredient.id,
    price: pi.Ingredient.price,
    hidden: pi.Ingredient.hidden,
    quantity: 1,
    name: pi.Ingredient.name,
  })))

  let ingredientRef: HTMLSelectElement | undefined

  const notSelectedIngredients = () => props.allIngredients
    .filter(i => !ingredients().some(si => si.id === i.id))

  createEffect(() => {
    console.log(ingredients())
  })

  return (
    <div class='flex flex-row gap-4'>
      <div class="overflow-x-auto">
        <table class="table table-zebra w-full">
          <thead>
            <tr>
              <th>Ingredient</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>

            {ingredients().map((i) => (
              <tr>
                <th>{i.name}</th>
                <th>
                  <select class="select w-full max-w-xs" value={i.quantity} onChange={(e)=>{
                    const value = parseInt(e.currentTarget.value)
                    if(value===0){
                      setIngredients(prevIngredients => prevIngredients.filter(pi => pi.id !== i.id))
                    } else{
                      setIngredients(prevIngredients => prevIngredients.map(pi => {
                        if(i.id === pi.id){
                          return { ...pi, quantity: value }
                        }
                        return pi
                      }))
                    }
                  }}>
                    <option>0</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </select>
                </th>
              </tr>
            ))}
            <tr>

              <th>
                <select ref={ingredientRef} class='text-black select select-bordered'>
                  <option selected >Add Ingredient</option>
                  {
                    notSelectedIngredients().map((i) =>
                    <option value={i.id}>{i.name}</option>)
                  }
                </select>
              </th>
              <th>
                <button class='btn btn-primary' onClick={() => {
                  const selectedIngredient = ingredientRef?.value
                  const id = parseInt(selectedIngredient)
                  const ingredient = props.allIngredients.find(i => i.id === id)
                  if (!ingredient) return
                  setIngredients(prevIngredients => [...prevIngredients, {
                    id: ingredient.id,
                    name: ingredient.name,
                    price: ingredient.price,
                    hidden: false,
                    quantity: 1
                  }])
                }}>
                  Add

                </button>
              </th>
            </tr>
          </tbody>
        </table>
      </div>

      <button class='btn btn-secondary'>
        Place order
      </button>

    </div>
  )
}
