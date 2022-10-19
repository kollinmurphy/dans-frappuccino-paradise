/* @jsxImportSource solid-js */

import { Ingredient, Product } from "@data/types/product"
import { createSignal } from "solid-js";

type Props = {
    product: Product;
    allIngredients: Array<Ingredient>;
}

export default function DrinkCustomization(props: Props) {
  const [ingredients, setIngredients] = createSignal(props.product.ProductIngredients.map(pi => pi.Ingredient))

  let ingredientRef: HTMLSelectElement | undefined

    return (
        <div>
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
                    <select class="select w-full max-w-xs">
                      <option selected>1</option>
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
                  {props.allIngredients.map((i) => 
                    
                    <option value={i.id}>{i.name}</option>)
                    }
                </select>
              </th>
              <th>
                <button class='btn btn-primary' onClick={()=>{
                  const selectedIngredient = ingredientRef?.value
                  const id = parseInt(selectedIngredient)
                  const ingredient = props.allIngredients.find(i => i.id === id)
                  if (!ingredient) return
                  setIngredients(prevIngredients => [...prevIngredients, ingredient])
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
