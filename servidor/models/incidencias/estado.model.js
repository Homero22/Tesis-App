import { DataTypes } from 'sequelize';
import { sequelize } from '../../database/postgres.js';

export const Estado = sequelize.define(
    "tb_estado",
    {
        int_estado_id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        str_estado_nombre:{
            type: DataTypes.STRING(100),
        },
        dt_fecha_creacion:{
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        str_estado_estado:{
            type: DataTypes.STRING(255),
            defaultValue: "ACTIVO"
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