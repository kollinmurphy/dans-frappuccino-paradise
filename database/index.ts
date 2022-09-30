"use strict";

import { Sequelize } from "sequelize";
import configFile from "./config/config.json";
const env = process.env.NODE_ENV || "development";
const config = configFile[env];

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

import AccountModel from "./models/Account";
import AccountFavoriteModel from "./models/AccountFavorite";
import HoursModel from "./models/Hours";
import OrderModel from "./models/Order";
import OrderProductModel from "./models/OrderProduct";
import OrderProductIngredientModel from "./models/OrderProductIngredient";
import ProductModel from "./models/Product";
import ProductIngredientModel from "./models/ProductIngredient";
import StoreConfigModel from "./models/StoreConfig";

export const Account = AccountModel(sequelize);
export const Hours = HoursModel(sequelize);
export const Order = OrderModel(sequelize);
export const OrderProduct = OrderProductModel(sequelize);
export const Product = ProductModel(sequelize);
export const StoreConfig = StoreConfigModel(sequelize);
export const OrderProductIngredient = OrderProductIngredientModel(sequelize);
export const AccountFavorite = AccountFavoriteModel(sequelize);
export const ProductIngredient = ProductIngredientModel(sequelize);

const db = {
  Account,
  AccountFavorite,
  Hours,
  Order,
  OrderProduct,
  OrderProductIngredient,
  Product,
  ProductIngredient,
  StoreConfig,
  sequelize,
};

Account.associate(db);

export default db;
