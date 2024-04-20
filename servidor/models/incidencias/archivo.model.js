import { DataTypes } from 'sequelize';
import { sequelize } from '../../database/postgres.js';

export const Archivo = sequelize.define(
    "tb_archivo",
    {
        int_archivo_id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        str_archivo_nombre:{
            type: DataTypes.STRING(250),
            allowNull: false
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