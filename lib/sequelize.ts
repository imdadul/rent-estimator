import { Sequelize } from 'sequelize-typescript';
import { Op } from 'sequelize';
import { Config } from './config/types';
import { getConfig } from './config/config-helpers';

const config: Config = getConfig();
export const sequelize = new Sequelize(config.connectionString, {
  database: config.options.database,
  dialect: config.options.dialect as
    | 'mysql'
    | 'postgres'
    | 'sqlite'
    | 'mariadb'
    | 'mssql'
    | 'mariadb',
  operatorsAliases: Op,
  storage: ':memory:',
  models: [__dirname + '/models'],
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  dialectOptions: {
    ssl: true
  }
});
