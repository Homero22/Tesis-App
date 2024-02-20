import { DataTypes } from 'sequelize';
import { sequelize } from '../../database/postgres.js';


export const Menu = sequelize.define(
    "tb_menu",
    {
        int_menu_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        int_menu_padre_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'tb_menu',
                key: 'int_menu_id'
            }
        },
        str_menu_nombre: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true
        },
        str_menu_descripcion: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        str_menu_path: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        str_menu_icono: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        str_menu_estado: {
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

