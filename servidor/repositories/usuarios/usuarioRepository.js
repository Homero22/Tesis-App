import { Usuario } from "../../models/esquemaSeguridad/usuario.model.js";
import { UsuarioRol } from "../../models/esquemaSeguridad/usuarioRoles.model.js";
import { Rol } from "../../models/esquemaSeguridad/rol.model.js";
import { Permiso } from "../../models/esquemaSeguridad/permisos.model.js";
import { PermisoRol } from "../../models/esquemaSeguridad/permisoRol.model.js";
import { Menu } from "../../models/esquemaSeguridad/menus.model.js";

const getAllUsers = async () => {
    try {
        const usuarios = await Usuario.findAll({});
    } catch (error) {
        console.log(error);
    }
}

const createUser = async (usuario) => {
    try {
        const usuarioCreado = await Usuario.create(usuario);
        return usuarioCreado;
    } catch (error) {
        console.log(error);
    }
}

const getUsuarioPorCedula = async (cedula) => {
    try {
        const usuario = await Usuario.findOne({
            where: {
                str_usuario_cedula: cedula
            },
            raw: true
        });
        return usuario;
    } catch (error) {
        console.log(error);
    }
}

export default {
    getAllUsers,
    createUser,
    getUsuarioPorCedula
}