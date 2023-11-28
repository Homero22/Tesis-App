import { UsuarioRol } from "../../models/esquemaSeguridad/usuarioRoles.model.js";

const getAllUsuarioRoles = async () => {
    try {
        const usuarioRoles = await UsuarioRol.findAll({});
        return usuarioRoles;
    } catch (error) {
        console.log(error);
    }
}

const createUsuarioRol = async (usuarioRol) => {
    try {
        const usuarioRolCreado = await UsuarioRol.create(usuarioRol);
        return usuarioRolCreado;
    } catch (error) {
        console.log(error);
    }
}


const getUsuarioRolPorId = async (id) => {
    try {
        const usuarioRol = await UsuarioRol.findOne({
            where: {
                int_usuario_rol_id: id
            },
            raw: true
        });
        return usuarioRol;
    } catch (error) {
        console.log(error);
    }
}

const actualizarUsuarioRol = async (id, usuarioRol) => {
    try {
        const usuarioRolActualizado = await UsuarioRol.update({
            int_usuario_id: usuarioRol.int_usuario_id,
            int_rol_id: usuarioRol.int_rol_id
        }, {
            where: {
                int_usuario_rol_id: id
            }
        });
        
        return usuarioRolActualizado;
       
    } catch (error) {
        console.log(error);
    }
}

const desactivarUsuarioRol = async (id, estado) => {
    try {
        const usuarioRolActualizado = await UsuarioRol.update({
            str_usuario_rol_estado: estado
        }, {
            where: {
                int_usuario_rol_id: id
            }
        });
        
        return usuarioRolActualizado;
       
    } catch (error) {
        console.log(error);
    }
}

const getUsuarioRolPorIdUsuario = async (idUsuario) => {
    try {
        const usuarioRol = await UsuarioRol.findOne({
            where: {
                int_usuario_id: idUsuario
            },
            raw: true
        });
        return usuarioRol;
    } catch (error) {
        console.log(error);
    }
}

const getUsuarioRolesPorIdUsuario = async (idUsuario) => {
    try {
        const usuarioRoles = await UsuarioRol.findAll({
            where: {
                int_usuario_id: idUsuario
            },
            raw: true
        });
        return usuarioRoles;
    } catch (error) {
        console.log(error);
    }
}

//funcion para comprobar que no se repita el int_usuario_id y el int_rol_id en la tabla tb_usuario_rol
const comprobarUsuarioRol = async (usuarioRol) => {
    try {
        const usuarioRolEncontrado = await UsuarioRol.findOne({
            where: {
                int_usuario_id: usuarioRol.int_usuario_id,
                int_rol_id: usuarioRol.int_rol_id
            },
            raw: true
        });
        return usuarioRolEncontrado;
    } catch (error) {
        console.log(error);
    }
}

export default {
    getAllUsuarioRoles,
    createUsuarioRol,
    getUsuarioRolPorId,
    actualizarUsuarioRol,
    desactivarUsuarioRol,
    getUsuarioRolPorIdUsuario,
    getUsuarioRolesPorIdUsuario,
    comprobarUsuarioRol
}