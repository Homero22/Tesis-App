import { DataTypes } from 'sequelize';
import { sequelize } from '../../database/postgres.js';
import { Menu } from './menus.model.js';
import { UsuarioRol } from './usuarioRoles.model.js';

export const Permiso= sequelize.define(
    "tb_permiso",
    {
        int_permiso_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        str_permiso_estado: {
            type: DataTypes.STRING(50),
            allowNull: false,
            defaultValue: 'ACTIVO'
        },
        bln_ver:{
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        bln_crear:{
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        bln_editar:{
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        bln_eliminar:{
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        int_menu_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Menu,
                key: "int_menu_id"
            }
        },
        int_usuario_rol_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: UsuarioRol,
                key: "int_usuario_rol_id"
            }
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
