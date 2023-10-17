import { DataTypes } from 'sequelize';
import { sequelize } from '../../database/postgres.js';
import { Rol } from './rol.model.js';


export const Permiso= sequelize.define(
    "tb_permiso",
    {
        int_permiso_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        str_permiso_nombre: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        str_permiso_descripcion: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        str_permiso_estado: {
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

//relacion muchos a muchos con la tabla rol 
