import { ProductIngredient } from "@data/types/product";
import db from "@database";
import {
  AuthorizedHandler,
  authorizedWrapper,
  ForbiddenError,
  InvalidRequestError,
  NotFoundError,
} from "@utils/wrapper";

type AddProductToOrderInput = {
  ingredients: Array<{
    ingredientId: number;
    quantity: number;
  }>;
  size: "small" | "medium" | "large";
};

export const addProductToOrder: AuthorizedHandler<
  AddProductToOrderInput
> = async ({ body, params, user }) => {
  const { orderId, productId } = params;
  const order = await db.Order.findByPk(orderId);
  if (!order) throw new NotFoundError("order not found");
  if (order.accountId !== user.id)
    throw new ForbiddenError("Insufficient permissions");
  const op = await db.OrderProduct.create(
    {
      productId: parseInt(productId as string),
      orderId: parseInt(orderId as string),
      size: body.size,
    },
    { include: [db.OrderProductIngredient] }
  );
  for (const i of body.ingredients)
    await db.OrderProductIngredient.create({
      orderProductId: op.id,
      ingredientId: i.ingredientId,
      quantity: i.quantity,
    });
  return db.OrderProduct.findByPk(op.id, {
    include: [db.OrderProductIngredient],
  });
};

export const post = authorizedWrapper(addProductToOrder);
