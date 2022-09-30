'use strict';

import { DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize } from 'sequelize'

const OrderProductIngredient = (sequelize: Sequelize) => {
  class OrderProductIngredient extends Model<InferAttributes<OrderProductIngredient>, InferCreationAttributes<OrderProductIngredient>> {
    declare orderProductId: number;
    declare productIngredientId: number;
    declare quantity: number;
    declare createdAt: Date;
    declare updatedAt: Date;

    static associate(models: any) {
      models.OrderProductIngredient.belongsTo(models.OrderProduct)
      models.OrderProductIngredient.belongsTo(models.ProductIngredient)
    }
  }
  OrderProductIngredient.init({
    orderProductId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    productIngredientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'OrderProductIngredient',
  });
  return OrderProductIngredient;
};

export default OrderProductIngredient
