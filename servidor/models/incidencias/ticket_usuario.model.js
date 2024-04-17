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
        int_usuario_id:{
            type: DataTypes.INTEGER,
            references: {
                model: Usuario,
                key: 'int_usuario_id'
            }
        },
        dt_fecha_creacion:{
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        dt_fecha_actualizacion:{
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        txt_ticket_usuario_solucion:{
            type: DataTypes.TEXT,
        }
    },
    {
        schema: "incidencias",
        timestamps: false,
        freezeTableName: true
    }
);
