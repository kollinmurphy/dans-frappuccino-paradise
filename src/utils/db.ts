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

export const getConfig = async (key: string, defaultValue: number) => {
  const config = await db.StoreConfig.findByPk(key)
  return config?.value || defaultValue
}

export const CONFIG_STORE_BALANCE = 'balance'
