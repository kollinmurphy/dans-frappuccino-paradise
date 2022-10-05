import db from "@database"
import wrapper, { Handler, NotFoundError } from "@utils/wrapper"

type GetOrderInput = {}

const getOrder: Handler<GetOrderInput> = async ({ params }) => {
  const orderId = params.id
  const order = await db.Order.findByPk(orderId)
  if (!order)
    throw new NotFoundError('order not found')
  return order
}

export const get = wrapper(getOrder)