"use strict";

import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from "sequelize";

const AccountFavorite = (sequelize: Sequelize) => {
  class AccountFavorite extends Model<
    InferAttributes<AccountFavorite>,
    InferCreationAttributes<AccountFavorite>
  > {
    declare accountId: number;
    declare orderProductId: number;
    declare name: string;
    declare createdAt: Date;
    declare updatedAt: Date;
  }
  AccountFavorite.init(
    {
      accountId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      orderProductId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Account",
    }
  );
  return AccountFavorite;
};

export default AccountFavorite;
