import { DataTypes } from 'sequelize';
import { sequelize } from '../../database/postgres.js';
import { Usuario } from  '../seguridad/usuario.model.js';
import { Ticket } from './ticket.model.js';
import { Estado } from './estado.model.js';
import { Servicio } from './servicio.model.js';
import { Vulnerabilidades } from './vulnerabilidades.model.js';


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
        },
        str_ticket_usuario_estado:{
            type: DataTypes.STRING,
            defaultValue: 'PENDIENTE'
        }
    },
    {
        schema: "incidencias",
        timestamps: false,
        freezeTableName: true
    }
);

//Relaciones
Ticket.belongsTo(Servicio, {foreignKey: 'int_servicio_id'});
Ticket.belongsTo(Estado, {foreignKey: 'int_estado_id'});
Ticket.belongsTo(Vulnerabilidades, {foreignKey: 'int_vulnerabilidades_id'});
Ticket.hasMany(TicketUsuario, {foreignKey: 'int_ticket_id'});
Usuario.hasMany(TicketUsuario, {foreignKey: 'int_usuario_id'});
TicketUsuario.belongsTo(Ticket, {foreignKey: 'int_ticket_id'});
TicketUsuario.belongsTo(Usuario, {foreignKey: 'int_usuario_id'});
