import db from "../../database";
import { getAllIngredients } from "../../src/pages/api/ingredients/all";

describe("Get All Ingredients", () => {
    let ingredientIds: Set<number>;

    beforeAll(async () => {
        const ingredients = await db.Ingredient.findAll()
        ingredientIds = new Set(ingredients.map(i => i.id))
    })

    test("gets all ingredients", async () => {
        const result = await getAllIngredients({ body: {}, params: {} })
        const actualIds = result.map(i => i.id)
        expect(actualIds.length).toBe(ingredientIds.size)
    })

})
