/* @jsxImportSource solid-js */

import { DrinkConfig } from "@data/types/drinkConfig";
import { Ingredient, Product } from "@data/types/product"
import { numToPrice } from "@utils/strings";
import { createEffect, createSignal, Show } from "solid-js";
import CoffeeIcon from "./CoffeeIcon";

type Props = {
  product: Product;
  allIngredients: Array<Ingredient>;
  config: DrinkConfig;
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
  const [size, setSize] = createSignal<'small' | 'medium' | 'large'>('small')

  let ingredientRef: HTMLSelectElement | undefined

  const notSelectedIngredients = () => props.allIngredients
    .filter(i => !ingredients().some(si => si.id === i.id))

  const basePrice = () => {
    switch (size()) {
      case 'small': return props.config.smallBasePrice * props.config.percentModifier
      case 'medium': return props.config.mediumBasePrice * props.config.percentModifier
      case 'large': return props.config.largeBasePrice * props.config.percentModifier
    }
  }

  const sizeMultiplier = () => {
    switch (size()) {
      case 'small': return 1
      case 'medium': return 2
      case 'large': return 3
    }
  }

  const addOnPrice = () => {
    return ingredients().reduce((sum, i) => sum + i.price * i.quantity, 0) * sizeMultiplier()
  }

  const total = () => {
    return basePrice() + addOnPrice()
  }

  return (
    <div class="flex flex-col md:flex-row gap-4">
      <div class="flex flex-col gap-4 items-center">
        <div class="scale-100">
          <img src={props.product.imageUrl} alt="Drink" class="rounded-md scale-100" />
        </div>
        <div class="btn-group">
          <button class="btn" classList={{ "bg-[#bbb]": size() === 'small' }} onClick={() => setSize('small')}><CoffeeIcon size={24} /></button>
          <button class="btn" classList={{ "bg-[#bbb]": size() === 'medium' }} onClick={() => setSize('medium')}><CoffeeIcon size={32}/></button>
          <button class="btn" classList={{ "bg-[#bbb]": size() === 'large' }} onClick={() => setSize('large')}><CoffeeIcon size={48}/></button>
        </div>
      </div>

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
                    <select class="select w-full max-w-xs" value={i.quantity} onChange={(e) => {
                      const value = parseInt(e.currentTarget.value)
                      if (value === 0) {
                        setIngredients(prevIngredients => prevIngredients.filter(pi => pi.id !== i.id))
                      } else {
                        setIngredients(prevIngredients => prevIngredients.map(pi => {
                          if (i.id === pi.id) {
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
        <div class="flex flex-col gap-4 items-center">
          <table class="table table-zebra table-compact w-full">
            <tbody>
              <tr>
                <td>Base Price</td>
                <td>{numToPrice(basePrice())}</td>
              </tr>
              <tr>
                <td>Add-ons</td>
                <td>{numToPrice(addOnPrice())}</td>
              </tr>
              <tr>
                <td>Tax</td>
                <td>$0.00</td>
              </tr>
              <tr class="font-bold">
                <td>Total</td>
                <td>{numToPrice(total())}</td>
              </tr>
            </tbody>
          </table>
          <button class='btn btn-secondary'>
            Place order
          </button>
        </div>

      </div>
    </div>
  )
}
