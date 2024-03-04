import { DataTypes } from 'sequelize';
import { sequelize } from '../../database/postgres.js';
import { Usuario } from  '../seguridad/usuario.model.js';
import { Ticket } from './ticket.model.js';

export const TicketUsuario = sequelize.define(
    "tb_ticket_usuario",
    {
        int_ticket_usuario_id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        int_ticket_id:{
            type: DataTypes.INTEGER,
            references: {
                model: Ticket,
                key: 'int_ticket_id'
            }
        },
        str_usuario_id:{
            type: DataTypes.STRING(50),
            references: {
                model: Usuario,
                key: 'str_usuario_id'
            }
        }
    },
    {
        schema: "incidencias",
        timestamps: false,
        freezeTableName: true
    }
);
