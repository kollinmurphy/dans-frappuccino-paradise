import { Ingredient } from "@data/types/product";
import runApiCall from "..";

const getIngredients = async ({
  hidden,
}: {
  hidden: boolean;
}): Promise<Array<Ingredient>> =>
  runApiCall(
    {
      method: "GET",
      path: `/ingredients${hidden ? '/all' : ''}`,
    },
  );

export default getIngredients;

export const placeIngredientOrder = async (
  ingredients: Array<{
    id: number;
    quantity: number;
  }>
): Promise<any> =>
  runApiCall(
    {
      method: "POST",
      path: "/ingredients",
    },
    { ingredients }
  );
