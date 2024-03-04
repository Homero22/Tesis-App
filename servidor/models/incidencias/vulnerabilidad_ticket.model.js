import { DataTypes } from 'sequelize';
import { sequelize } from '../../database/postgres.js';
import { Vulnerabilidades } from './vulnerabilidades.model.js';
import { Ticket } from './ticket.model.js';

export const VulnerabilidadTicket = sequelize.define(
    "tb_vulnerabilidad_ticket",
    {
        int_vulnerabilidad_ticket_id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        int_vulnerabilidad_id:{
            type: DataTypes.INTEGER,
            references: {
                model: Vulnerabilidades,
                key: 'int_vulnerabilidades_id'
            }
        },
        int_ticket_id:{
            type: DataTypes.INTEGER,
            references: {
                model: Ticket,
                key: 'int_ticket_id'
            }
        }
    },
    {
        schema: "incidencias",
        timestamps: false,
        freezeTableName: true
    }
);