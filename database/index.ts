'use strict';

import { Sequelize } from 'sequelize';
import configFile from './config/config.json'
const env = process.env.NODE_ENV || 'development';
const config = configFile[env];

const sequelize = new Sequelize(config.database, config.username, config.password, config);

import AccountModel from './models/Account';
import HoursModel from './models/Hours';
import OrderModel from './models/Order';
import StoreConfigModel from './models/StoreConfig';

export const Account = AccountModel(sequelize)
export const Hours = HoursModel(sequelize)
export const Order = OrderModel(sequelize)
export const StoreConfig = StoreConfigModel(sequelize);

const db = { Account, Hours, sequelize }

Account.associate(db)

export default db;
