import { DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize } from "sequelize";

const OrderProduct = (sequelize: Sequelize) => {
  class OrderProduct extends Model<InferAttributes<OrderProduct>, InferCreationAttributes<OrderProduct>> {
    declare productId: number;
    declare orderId: number;
    declare size: 'small' | 'medium' | 'large';;
    declare createdAt: Date;
    declare updatedAt: Date;

    static associate(models: any) {
      models.OrderProduct.belongsTo(models.Order)
      models.Account.hasMany(models.OrderProductIngredients)
    }
  }

  OrderProduct.init({
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    size: {
        type: DataTypes.ENUM('small', 'medium', 'large'),
        allowNull: false,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'OrderProduct',
  })
  return OrderProduct
}

export default OrderProduct
