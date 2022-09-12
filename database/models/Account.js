'use strict';

import { Model } from 'sequelize'

const Account = (sequelize, DataTypes) => {
  class Account extends Model {
    static associate(models) {
      // TODO define association here
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
  }, {
    sequelize,
    modelName: 'Account',
  });
  return Account;
};

export default Account
