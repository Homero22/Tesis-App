import { DataTypes } from 'sequelize';
import { sequelize } from '../../database/postgres.js';
import { Usuario } from '../seguridad/usuario.model.js';

export const NotificacionesUsuario = sequelize.define(
    "tb_notificaciones_usuario",
    {
        int_notificacion_id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        int_usuario_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Usuario,
                key: 'int_usuario_id'
            }
        },
        str_notificacion_titulo:{
            type: DataTypes.STRING(255),
            allowNull: false
        },
        str_notificacion_descripcion:{
            type: DataTypes.STRING(255),
            allowNull: false
        },
        dt_fecha_creacion:{
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