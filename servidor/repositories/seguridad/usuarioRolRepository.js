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
//crear un usuarioRol con transaccion
const createUsuarioRolT = async (idRol, idUsuer , t) => {
    try {
        //creo el usuarioRol y retorno el int_usuario_rol_id
        const usuarioRolCreado = await UsuarioRol.create({
            int_usuario_id: idUsuer,
            int_rol_id: idRol
        }, { transaction: t });
        return usuarioRolCreado.int_usuario_rol_id;

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

const cambiarEstadoUsuarioRol = async (id, estado) => {
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

const getUsuarioRolByIdUsuarioAndRol = async (idUsuario, rol) => {
    try {
        const usuarioRol = await UsuarioRol.findOne({
            where: {
                int_usuario_id: idUsuario,
                int_rol_id: rol
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
                int_usuario_id: idUsuario,
                str_usuario_rol_estado: "ACTIVO"
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
    cambiarEstadoUsuarioRol,
    getUsuarioRolPorIdUsuario,
    getUsuarioRolesPorIdUsuario,
    comprobarUsuarioRol,
    createUsuarioRolT,
    getUsuarioRolByIdUsuarioAndRol
}