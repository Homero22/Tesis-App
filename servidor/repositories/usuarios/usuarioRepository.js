import { Usuario } from "../../models/esquemaSeguridad/usuario.model.js";
import { UsuarioRol } from "../../models/esquemaSeguridad/usuarioRoles.model.js";
import { Rol } from "../../models/esquemaSeguridad/rol.model.js";
import { Permiso } from "../../models/esquemaSeguridad/permisos.model.js";
import { PermisoRol } from "../../models/esquemaSeguridad/permisoRol.model.js";
import { Menu } from "../../models/esquemaSeguridad/menus.model.js";

const getAllUsers = async () => {
    try {
        const usuarios = await Usuario.findAll({});
        return usuarios;
    } catch (error) {
        console.log(error);
    }
}

const obtenerUsuariosConPaginacion = async (pagina, cantidad) => {
    try {
        const usuarios = await Usuario.findAll({
            offset: pagina,
            limit: cantidad
        });
        return usuarios;
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

const actualizarTelefonoUsuario = async (id, telefono) => {
    try {
        const usuarioActualizado = await Usuario.update({
            str_usuario_telefono: telefono
        }, {
            where: {
                int_usuario_id: id
            }
        });
        
        return usuarioActualizado;
       
    } catch (error) {
        console.log(error);
    }
}
const obtenerUsuarioPorId = async (id) => {
    try {
        const usuario = await Usuario.findOne({
            where: {
                int_usuario_id: id
            },
            raw: true
        });
        return usuario;
    } catch (error) {
        console.log(error);
    }

}
const desactivarUsuario = async (id,estado) => {
    try {
        const usuarioDesactivado = await Usuario.update({
            str_usuario_estado: estado
        }, {
            where: {
                int_usuario_id: id
            }
        });
        return usuarioDesactivado;
    } catch (error) {
        console.log(error);
    }
}

export default {
    getAllUsers,
    createUser,
    getUsuarioPorCedula,
    obtenerUsuariosConPaginacion,
    actualizarTelefonoUsuario,
    obtenerUsuarioPorId,
    desactivarUsuario
}