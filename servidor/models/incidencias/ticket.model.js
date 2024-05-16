import { DataTypes } from 'sequelize';
import { sequelize } from '../../database/postgres.js';
import { Estado } from './estado.model.js';
import { Servicio } from './servicio.model.js';
import { Vulnerabilidades } from './vulnerabilidades.model.js';





export const Ticket = sequelize.define(
    "tb_ticket",
    {
        int_ticket_id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        int_servicio_id:{
            type: DataTypes.INTEGER,
            references: {
                model: Servicio,
                key: 'int_servicio_id'
            }
        },
        int_vulnerabilidades_id:{
            type: DataTypes.INTEGER,
            references: {
                model: Vulnerabilidades,
                key: 'int_vulnerabilidades_id'
            }
        },
        int_estado_id:{
            type: DataTypes.INTEGER,
            references: {
                model: Estado,
                key: 'int_estado_id'
            }
        },
        str_ticket_observacion:{
            type: DataTypes.TEXT,
        },
        dt_fecha_creacion:{
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        dt_fecha_actualizacion:{
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
    },
    {
        schema: "incidencias",
        timestamps: false,
        freezeTableName: true
    }
);



