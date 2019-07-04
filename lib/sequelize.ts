import {Sequelize} from 'sequelize-typescript';
import {Op} from 'sequelize';

export const sequelize = new Sequelize('postgres://lejugbky:A8EjvzxYE7pVrYLRPcTodMW7EB4hn09t@manny.db.elephantsql.com:5432/lejugbky',{
    database: 'lejugbky',
    dialect: 'postgres',
    operatorsAliases: Op,
    storage: ':memory:',
    models: [__dirname + '/models']
});