import db from "@database"

export const getLatestOrder = async (accountId: number) => {
  const orders = await db.Order.findAll({
    where: {
      accountId,
      paid: false,
      status: 'created',
    },
    include: [{
      model: db.OrderProduct,
      include: [{
        model: db.OrderProductIngredient,
        include: [db.Ingredient],
      }],
    }],
    order: [['createdAt', 'DESC']],
    limit: 1,
  })
  const order = orders.length > 0 ? orders[0] : null
  return order
}
