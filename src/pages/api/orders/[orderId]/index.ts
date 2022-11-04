import { DrinkConfig } from "@data/types/drinkConfig";
import db from "@database";
import {
  CONFIG_LARGE_BASE,
  CONFIG_MEDIUM_BASE,
  CONFIG_PERCENT_MARKUP,
  CONFIG_SMALL_BASE,
  CONFIG_STORE_BALANCE,
  getConfig,
} from "@utils/db";
import wrapper, {
  AuthorizedHandler,
  authorizedWrapper,
  ForbiddenError,
  Handler,
  InvalidRequestError,
  NotFoundError,
} from "@utils/wrapper";

type GetOrderInput = {};

const getOrder: Handler<GetOrderInput> = async ({ params }) => {
  const orderId = params.orderId;
  const order = await db.Order.findByPk(orderId);
  if (!order) throw new NotFoundError("order not found");
  return order;
};

export const get = wrapper(getOrder);

const getMultiplierFromSize = (size: "small" | "medium" | "large") => {
  switch (size) {
    case "small":
      return 1;
    case "medium":
      return 2;
    case "large":
      return 3;
  }
};

type PlaceOrderInput = {
  userId?: number;
};

export const placeOrder: AuthorizedHandler<PlaceOrderInput> = async ({
  params,
  user,
  body,
}) => {
  const orderId = params.orderId;
  const order = await db.Order.findByPk(orderId, {
    include: [
      {
        model: db.OrderProduct,
        include: [
          {
            model: db.OrderProductIngredient,
            include: [db.Ingredient],
          },
        ],
      },
    ],
  });
  if (body.userId && user.role === 'user')
    throw new ForbiddenError('You do not have permission to place an order for another user');
  if (!order) throw new NotFoundError("order not found");
  const account = await db.Account.findByPk(user.id);
  if (!account) throw new ForbiddenError("account not found");
  if (order.accountId !== (body.userId || account.id))
    throw new ForbiddenError("order does not belong to account");
  if (order.status !== "created")
    throw new ForbiddenError("order is not in created status");
  // @ts-ignore
  if (order.OrderProducts.length !== 1)
    throw new ForbiddenError("order must have one product");

  const behalfOfAccount = await db.Account.findByPk(body.userId || account.id);

  // @ts-ignore
  const ingredients = order.OrderProducts.map((op) =>
    op.OrderProductIngredients.map((opi) => ({
      ...opi.Ingredient.get({ plain: true }),
      quantity: opi.quantity * getMultiplierFromSize(op.size),
    }))
  ).flat();

  // TODO add hidden ingredients

  // @ts-ignore
  const size = order.OrderProducts[0].size

  const hiddenInventory = await db.Ingredient.findAll({
    where: {
      hidden: true,
    },
  });
  const cups = []
  for (const hiddenIngredient of hiddenInventory) {
    const name = hiddenIngredient.name.toLowerCase()
    if (name.includes('small') || name.includes('medium') || name.includes('large'))
      cups.push(hiddenIngredient.get({ plain: true }))
    else if (hiddenIngredient.name.toLowerCase().includes("coffee"))
      ingredients.push({
        ...hiddenIngredient.get({ plain: true }),
        // @ts-ignore
        quantity: getMultiplierFromSize(size),
      })
    else
      ingredients.push({
        ...hiddenIngredient.get({ plain: true }),
        quantity: 1,
      })
  }

  const cup = cups.find(cup => cup.name.toLowerCase().includes(size))
  ingredients.push({ ...cup, quantity: 1 })

  const config: DrinkConfig = {
    percentModifier: await getConfig(CONFIG_PERCENT_MARKUP, 1.5),
    smallBasePrice: await getConfig(CONFIG_SMALL_BASE, 1),
    mediumBasePrice: await getConfig(CONFIG_MEDIUM_BASE, 2),
    largeBasePrice: await getConfig(CONFIG_LARGE_BASE, 3),
  };

  const getBasePriceFromSize = (size: "small" | "medium" | "large") => {
    switch (size) {
      case "small":
        return config.smallBasePrice;
      case "medium":
        return config.mediumBasePrice;
      case "large":
        return config.largeBasePrice;
    }
  };

  // @ts-ignore
  const productBases = order.OrderProducts.reduce(
    (sum, op) => sum + getBasePriceFromSize(op.size),
    0
  );

  const ingredientsMap = new Map<
    number,
    { quantity: number; price: number; name: string }
  >();
  for (const i of ingredients) {
    const currentQuantity = ingredientsMap.get(i.id)?.quantity ?? 0;
    ingredientsMap.set(i.id, {
      quantity: currentQuantity + i.quantity,
      price: i.price,
      name: i.name,
    });
  }

  const total =
    Math.round(
      ([...ingredientsMap.values()].reduce(
        (acc, cur) => acc + cur.quantity * cur.price,
        0
      ) +
        productBases) *
        config.percentModifier *
        100
    ) / 100;
  if (!total)
    throw new InvalidRequestError(`total is ${total}, something went wrong`);
  if (total > behalfOfAccount.balance) throw new ForbiddenError("Insufficient funds.");

  for (const i of ingredientsMap.keys()) {
    const ingredient = await db.Ingredient.findByPk(i);
    if (!ingredient) throw new NotFoundError("ingredient not found");
    if (ingredient.quantityOnHand < ingredientsMap.get(i)?.quantity || 0)
      throw new ForbiddenError(
        `Oh no! Looks like we're out of stock of ${ingredientsMap
          .get(i)
          ?.name?.toLowerCase()}.`
      );
  }

  await db.sequelize.transaction(async (t) => {
    await order.update({ status: "purchased", total }, { transaction: t });
    await behalfOfAccount.update(
      { balance: behalfOfAccount.balance - total },
      { transaction: t }
    );
    const [config, created] = await db.StoreConfig.findOrCreate({
      where: { key: CONFIG_STORE_BALANCE },
      defaults: { value: total },
      transaction: t,
    })
    if (!created)
      await config.update({ value: config.value + total }, { transaction: t });
    for (const i of ingredientsMap.keys()) {
      const ingredient = await db.Ingredient.findByPk(i, { transaction: t });
      if (!ingredient) throw new NotFoundError("ingredient not found");
      await ingredient.update(
        {
          quantityOnHand:
            ingredient.quantityOnHand - (ingredientsMap.get(i)?.quantity || 0),
        },
        { transaction: t }
      );
    }
  });

  return {
    success: true,
    total,
    order,
  };
};

export const patch = authorizedWrapper(placeOrder);
