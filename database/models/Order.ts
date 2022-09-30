'use strict';

import { DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize } from 'sequelize'

const Order = (sequelize: Sequelize) => {
  class Order extends Model<InferAttributes<Order>, InferCreationAttributes<Order>> {
    declare accountId: number;
    declare paid: boolean;
    declare status: 'created' | 'cancelled' | 'fulfilled';
    declare createdAt: Date;
    declare updatedAt: Date;

    static associate(models: any) {
      models.Order.hasMany(models.OrderProduct)
      models.Hours.belongsTo(models.Account)
    }
  }
  Order.init({
    accountId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    paid: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
    status: {
      type: DataTypes.ENUM('created', 'cancelled', 'fulfilled'),
      allowNull: false,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};

export default Order