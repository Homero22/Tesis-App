/**
 * Estableceremos el modelo de la tabla usuarios
 */
import { DataTypes } from 'sequelize';
import { sequelize } from '../../database/postgres.js'; 

export const Usuario=  sequelize.define('tb_usuario', 
    {
        int_usuario_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        str_usuario_nombre: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        str_usuario_apellido: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        str_usuario_email: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        str_usuario_cedula: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        str_usuario_estado: {
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
        schema: 'seguridad',
        timestamps: false,
        freezeTableName: true,
    }
);
