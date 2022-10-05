import db from "@database"
import wrapper, { Handler, NotFoundError } from "@utils/wrapper"

type GetProductInput = {}

const getProduct: Handler<GetProductInput> = async ({ params }) => {
  const productId = params.id
  const product = await db.Product.findByPk(productId)
  if (!product)
    throw new NotFoundError('Product not found')
  return product
}

export const get = wrapper(getProduct)
