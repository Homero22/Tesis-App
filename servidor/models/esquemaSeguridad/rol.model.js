import { DataTypes } from 'sequelize';
import { sequelize } from '../../database/postgres.js'; 

export const Rol=  sequelize.define(
    "tb_rol",
    {
        int_rol_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        str_rol_nombre: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        str_rol_descripcion: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        str_rol_estado: {
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
