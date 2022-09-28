'use strict';

import { Sequelize } from 'sequelize';
import configFile from './config/config.json'
const env = process.env.NODE_ENV || 'development';
const config = configFile[env];

const sequelize = new Sequelize(config.database, config.username, config.password, config);

import AccountModel from './models/Account';
import HoursModel from './models/Hours';

export const Account = AccountModel(sequelize)
export const Hours = HoursModel(sequelize)

const db = { Account, Hours, sequelize }

Account.associate(db)

export default db;
