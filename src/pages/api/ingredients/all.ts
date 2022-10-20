import db from "@database";
import wrapper, { Handler } from "@utils/wrapper";

type GetIngredientsInput = {};

const getAllIngredients: Handler<GetIngredientsInput> = async () => {
  return db.Ingredient.findAll();
};

export const get = wrapper(getAllIngredients);
