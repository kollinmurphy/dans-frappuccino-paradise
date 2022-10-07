import db from "@database";
import {
  AuthorizedHandler,
  authorizedWrapper,
} from "@utils/wrapper";

type CreateOrderInput = {};

const createOrder: AuthorizedHandler<CreateOrderInput> = async ({ user }) => {
  const order = await db.Order.create({
    accountId: user.id,
    status: "created",
    paid: false,
  });
  return order;
};

export const post = authorizedWrapper(createOrder);
