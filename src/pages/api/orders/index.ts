import db from "@database"
import wrapper, { Handler, AuthorizedHandler, authorizedWrapper } from "@utils/wrapper"

type GetOrderInput = {}

const postOrders: AuthorizedHandler<GetOrderInput> = async ({ user }) => {
    const order = await db.Order.create({
        accountId: user.id,
        status: "created",
        paid: false,
    })
    return order
}

export const post = authorizedWrapper(postOrders)

  
  