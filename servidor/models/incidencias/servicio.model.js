import { DataTypes } from 'sequelize';
import { sequelize } from '../../database/postgres.js';

export const Servicio = sequelize.define(
    "tb_servicio",
    {
        int_servicio_id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        str_servicio_nombre:{
            type: DataTypes.STRING(100),
        },
        str_servicio_estado:{
            type: DataTypes.STRING(255),
            defaultValue: 'ACTIVO'
        },
        dt_fecha_creacion:{
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        dt_fecha_actualizacion:{
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    },
    {
        schema: "incidencias",
        timestamps: false,
        freezeTableName: true
    }
);