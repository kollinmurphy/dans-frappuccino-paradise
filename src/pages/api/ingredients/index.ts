import db from "@database"
import wrapper, { Handler } from "@utils/wrapper"

type GetIngredientsInput = {}

const getIngredients: Handler<GetIngredientsInput> = async () => {
  return db.Ingredient.findAll({
    where: {
      hidden: false,
    },
  })
}

export const get = wrapper(getIngredients)
