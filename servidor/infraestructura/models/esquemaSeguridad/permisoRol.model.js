import { DataTypes } from 'sequelize';
import { sequelize } from '../../database/postgres.js';
import { Rol } from './rol.model.js';
import { Permiso } from './permisos.model.js'; 

export const PermisoRol=  sequelize.define(
    "tb_permiso_rol",
    {
        int_permiso_rol_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        int_permiso_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Permiso,
                key: "int_permiso_id"
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
        str_permiso_rol_estado: {
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
    }
);