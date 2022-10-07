import db from "@database"
import wrapper, { Handler } from "@utils/wrapper"

type GetProductsInput = {}

const getProducts: Handler<GetProductsInput> = async () => {
  return db.Product.findAll({
    where: {
      isDeleted: false,
    },
  })
}

export const get = wrapper(getProducts)
