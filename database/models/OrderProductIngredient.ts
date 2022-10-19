'use strict';

import { DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize } from 'sequelize'

const OrderProductIngredient = (sequelize: Sequelize) => {
  class OrderProductIngredient extends Model<InferAttributes<OrderProductIngredient>, InferCreationAttributes<OrderProductIngredient>> {
    declare orderProductId: number;
    declare ingredientId: number;
    declare quantity: number;
    declare createdAt: Date;
    declare updatedAt: Date;
  }
  OrderProductIngredient.init({
    orderProductId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ingredientId: {
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
