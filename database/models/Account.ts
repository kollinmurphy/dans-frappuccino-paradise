'use strict';

import { DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize } from 'sequelize'

const Account = (sequelize: Sequelize) => {
  class Account extends Model<InferAttributes<Account>, InferCreationAttributes<Account>> {
    declare username: string;
    declare password: string;
    declare role: 'manager' | 'employee' | 'user';
    declare balance: number;
    declare isDeleted: boolean;
    declare createdAt: Date;
    declare updatedAt: Date;

    static associate(models: any) {
      models.Account.hasMany(models.Hours)
    }
  }
  Account.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('manager', 'employee', 'user'),
      allowNull: false,
    },
    balance: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false,
      defaultValue: 0,
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'Account',
  });
  return Account;
};

export default Account
