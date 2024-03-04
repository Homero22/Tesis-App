import { DataTypes } from 'sequelize';
import { sequelize } from '../../database/postgres.js';

export const Ticket = sequelize.define(
    "tb_ticket",
    {
        int_ticket_id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        str_ticket_titulo:{
            type: DataTypes.STRING(100),
        },
        str_ticket_descripcion:{
            type: DataTypes.TEXT,
        },
        str_ticket_estado:{
            type: DataTypes.STRING(50),
        },
        str_ticket_prioridad:{
            type: DataTypes.STRING(50),
        },
        str_ticket_tipo:{
            type: DataTypes.STRING(50),
        },
        str_ticket_categoria:{
            type: DataTypes.STRING(50),
        },
        str_ticket_subcategoria:{
            type: DataTypes.STRING(50),
        },
        str_ticket_responsable:{
            type: DataTypes.STRING(50),
        },
        str_ticket_usuario:{
            type: DataTypes.STRING(50),
        },
        str_ticket_fecha_creacion:{
            type: DataTypes.DATE,
        },
        str_ticket_fecha_modificacion:{
            type: DataTypes.DATE,
        },
        str_ticket_fecha_cierre:{
            type: DataTypes.DATE,
        },
        str_ticket_comentario:{
            type: DataTypes.TEXT,
        }
    },
    {
        schema: "incidencias",
        timestamps: false,
        freezeTableName: true
    }
);