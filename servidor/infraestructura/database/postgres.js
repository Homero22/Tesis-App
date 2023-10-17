import { Sequelize } from "sequelize";

import { dbVariables } from "../configuracion/variablesGlobales.js";

export const sequelize = new Sequelize(
    dbVariables.dbName,
    dbVariables.dbUser,
    dbVariables.dbPassword,
    {
        host: dbVariables.dbServer,
        dialect: dbVariables.dbDialect,
        port: dbVariables.dbPort,
        logging: false,
    }
);