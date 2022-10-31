import db from "@database";
import {
  AuthorizedHandler,
  authorizedWrapper,
  ForbiddenError,
} from "@utils/wrapper";

type CreateOrderInput = {
  userId?: number;
};

const createOrder: AuthorizedHandler<CreateOrderInput> = async ({
  user,
  body,
}) => {
  const { userId } = body;
  if (userId && user.role === "user")
    throw new ForbiddenError("only admins and employees can create orders for other users");
  const order = await db.Order.create({
    accountId: userId || user.id,
    status: "created",
    paid: false,
  });
  return order;
};

export const post = authorizedWrapper(createOrder);
