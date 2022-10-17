import { Ingredient } from "@data/types/product";
import runApiCall from "..";

const getIngredients = async (): Promise<Array<Ingredient>> =>
  runApiCall(
    {
      method: "GET",
      path: "/ingredients",
    },
  );

export default getIngredients;
