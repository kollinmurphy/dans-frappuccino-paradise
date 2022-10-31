import db from "@database";
import { AuthorizedHandler, authorizedWrapper, NotFoundError } from "@utils/wrapper";

type UpdateOrderStatusBody = {}

const updateOrderStatus: AuthorizedHandler<UpdateOrderStatusBody> = async ({ params }) => {
    const { orderId } = params
    const id: number = parseInt(orderId as string)
    const order = await db.Order.findByPk(id)
    if (!order)
        throw new NotFoundError('order not found')
    await order.update({ status: 'fulfilled' })
}

export const patch = authorizedWrapper(updateOrderStatus)
