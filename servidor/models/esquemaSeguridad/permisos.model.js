import { DataTypes } from 'sequelize';
import { sequelize } from '../../database/postgres.js';
import { Menu } from './menus.model.js';
import { UsuarioRol } from './usuarioRoles.model.js';
import { Usuario } from './usuario.model.js';
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
        str_permiso_estado: {
            type: DataTypes.STRING(50),
            allowNull: false,
            defaultValue: 'ACTIVO'
        },
        bln_permiso_ver:{
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        bln_permiso_crear:{
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        bln_permiso_editar:{
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        bln_permiso_eliminar:{
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
        uniqueKeys:{
            unique_permiso:{
                fields:['int_menu_id','int_usuario_rol_id']
            }
        }

    }
);
// Modelo Usuario
Usuario.hasMany(UsuarioRol, { foreignKey: 'int_usuario_id', as: 'RolesUsuarios' });

// Modelo Rol
Rol.hasMany(UsuarioRol, { foreignKey: 'int_rol_id', as: 'UsuariosRoles' });

// Modelo UsuarioRol
UsuarioRol.belongsTo(Usuario, { foreignKey: 'int_usuario_id', as: 'Usuario' });
UsuarioRol.belongsTo(Rol, { foreignKey: 'int_rol_id', as: 'Rol' });
UsuarioRol.hasMany(Permiso, { foreignKey: 'int_usuario_rol_id', as: 'Permisos' });

// Modelo Permiso
Permiso.belongsTo(UsuarioRol, { foreignKey: 'int_usuario_rol_id', as: 'UsuarioRol' });
Permiso.belongsTo(Menu, { foreignKey: 'int_menu_id', as: 'OpcionMenu' });

// Modelo Menu
Menu.hasMany(Permiso, { foreignKey: 'int_menu_id', as: 'Permisos' });
Menu.hasMany(Menu, { foreignKey: 'int_menu_padre_id', as: 'Hijos' });
Menu.belongsTo(Menu, { foreignKey: 'int_menu_padre_id', as: 'Padre' });


