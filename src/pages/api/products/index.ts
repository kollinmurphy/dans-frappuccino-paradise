import db from "@database"
import wrapper, { Handler } from "@utils/wrapper"

type GetDrinkInput = {}

const getDrinks: Handler<GetDrinkInput> = async () => {
  return db.Product.findAll({
    where: {
      isDeleted: false,
    },
  })
}

export const get = wrapper(getDrinks)
