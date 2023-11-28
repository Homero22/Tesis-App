import { DataTypes } from 'sequelize';
import { sequelize } from '../../database/postgres.js';
import { Rol } from './rol.model.js';
import { Usuario } from './usuario.model.js'; 


//Define la relación entre Usuario y Rol (Muchos a muchos)

export const UsuarioRol = sequelize.define(
    "tb_usuario_rol",
    {
        int_usuario_rol_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        int_usuario_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Usuario,
                key: "int_usuario_id"
            }
        },
        int_rol_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Rol,
                key: "int_rol_id"
            }
        },
        str_usuario_rol_estado: {
            type: DataTypes.STRING(50),
            allowNull: false,
            defaultValue: 'ACTIVO'
        },
        dt_fecha_creacion: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        dt_fecha_actualizacion: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
    },
    {
        schema: "seguridad",
        timestamps: false,
        freezeTableName: true,
        uniqueKeys: {
            unique_usuario_rol: {
                fields: ['int_usuario_id', 'int_rol_id']
            }
        }
    }
);