import db from "@database";
import { CONFIG_STORE_BALANCE, getConfig } from "@utils/db";
import wrapper, {
  adminWrapper,
  AuthorizedHandler,
  Handler,
  InvalidRequestError,
} from "@utils/wrapper";

type GetIngredientsInput = {};

const getIngredients: Handler<GetIngredientsInput> = async () => {
  return db.Ingredient.findAll({
    where: {
      hidden: false,
    },
  });
};

export const get = wrapper(getIngredients);

type PlaceInventoryOrderInput = {
  ingredients: Array<{
    id: number;
    quantity: number;
  }>;
};

const placeInventoryOrder: AuthorizedHandler<PlaceInventoryOrderInput> = async ({ body }) => {
  const ingredients = await db.Ingredient.findAll({
    where: { id: body.ingredients.map((i) => i.id) },
  });
  const ingredientIdToQuantity = body.ingredients.reduce((map, i) => {
    map.set(i.id, i.quantity)
    return map
  }, new Map<number, number>())
  let totalCost = 0
  for (const i of ingredients) {
    const quantity = ingredientIdToQuantity.get(i.id) || 0
    totalCost += quantity * i.price
  }
  const currentBalance = await getConfig(CONFIG_STORE_BALANCE, 0)
  if (currentBalance < totalCost)
    throw new InvalidRequestError("Insufficient funds")
  const [balanceConfig] = await db.StoreConfig.upsert({ key: CONFIG_STORE_BALANCE, value: currentBalance - totalCost })
  for (const i of ingredients) {
    const quantity = ingredientIdToQuantity.get(i.id) || 0
    await i.update({ quantityOnHand: i.quantityOnHand + quantity })
  }
  return {
    currentBalance: balanceConfig.value,
    totalCost,
  }
};

export const post = adminWrapper(placeInventoryOrder);
