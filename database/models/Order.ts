"use strict";

import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from "sequelize";

const Order = (sequelize: Sequelize) => {
  class Order extends Model<
    InferAttributes<Order>,
    InferCreationAttributes<Order>
  > {
    declare accountId: number;
    declare paid: boolean;
    declare status: "created" | "purchased" | "cancelled" | "fulfilled";
    declare total: number;
    declare createdAt: Date;
    declare updatedAt: Date;
  }
  Order.init(
    {
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
        type: DataTypes.ENUM("created", "purchased", "cancelled", "fulfilled"),
        allowNull: false,
      },
      total: {
        type: DataTypes.DECIMAL,
        allowNull: true,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};

export default Order;
