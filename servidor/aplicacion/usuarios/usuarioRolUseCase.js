import usuarioRolRepository from "../../repositories/seguridad/usuarioRolRepository.js";
import usuarioRepository from "../../repositories/seguridad/usuarioRepository.js";
import rolRepository from "../../repositories/seguridad/rolRepository.js";

const obtenerRolesPorUsuarioService = async (id) => {
    //comprobar que el id del usuario exista
    const usuario = await usuarioRepository.obtenerUsuarioPorId(id);
    if (!usuario) {
        return {
        status: false,
        message: "No se encontró el usuario con el id enviado",
        body: [],
        };
    }

    //obtener todos los roles por usuario
    const roles = await usuarioRolRepository.getUsuarioRolesPorIdUsuario(id);
    
    let respuesta = {};

    if (roles.length > 0) {
        //extraer los nombres de los roles y el nombre del usuario buscando por el id en los repositorios
        for (let i = 0; i < roles.length; i++) {
            const rol = await rolRepository.getRolPorId(roles[i].int_rol_id);
            roles[i].str_rol_nombre = rol.str_rol_nombre;
        }
        //añado la información del usuario en la posición 0 del array
        roles[0].usuario= usuario;


        respuesta = {
        status: true,
        message: "Roles encontrados",
        body: roles,
        };
    } else {
        respuesta = {
        status: false,
        message: "No se encontraron roles",
        body: [],
        };
    }
    
    return respuesta;
};
const crearUsuarioRolService = async (idRol, idUsuario) => {
    //comprobar que el id del usuario exista
    const usuario = await usuarioRepository.obtenerUsuarioPorId(idUsuario);
    if (!usuario) {
        return {
        status: false,
        message: "No se encontró el usuario con el id enviado",
        body: [],
        };
    }

    //comprobar que el id del rol exista
    const rol = await rolRepository.getRolPorId(idRol);
    if (!rol) {
        return {
        status: false,
        message: "No se encontró el rol con el id enviado",
        body: [],
        };
    }
    const info = {
        int_rol_id: idRol,
        int_usuario_id : idUsuario
    }
    //comprobar que no exista un registro con el id del usuario y el id del rol
    const usuarioRol = await usuarioRolRepository.comprobarUsuarioRol(info);
    if (usuarioRol) {
        return {
        status: false,
        message: "El usuario ya tiene el rol",
        body: [],
        };
    }

    //crear el usuario rol
    const usuarioRolCreado = await usuarioRolRepository.createUsuarioRol(info);
    if (!usuarioRolCreado) {
        return {
        status: false,
        message: "No se pudo crear el usuario rol",
        body: [],
        };
    }

    return {
        status: true,
        message: "Usuario rol creado correctamente",
        body: usuarioRolCreado,
    };
}
const cambiarEstadoUsuarioRolService = async (id) => {
    //comprobar que el id del usuario exista
    const usuarioRol = await usuarioRolRepository.getUsuarioRolPorId(id);
    if (!usuarioRol) {
        return {
        status: false,
        message: "No se encontró el usuario rol con el id enviado",
        body: [],
        };
    }
    //extraigo el estado actual del usuario rol
    let estadoActual = usuarioRol.str_usuario_rol_estado;
    if(estadoActual =="ACTIVO"){
        estadoActual = "INACTIVO";
    }else{
        estadoActual = "ACTIVO";
    }

    //desactivar el usuario rol
    const usuarioRolDesactivado = await usuarioRolRepository.cambiarEstadoUsuarioRol(id, estadoActual);
    if (!usuarioRolDesactivado) {
        return {
        status: false,
        message: "No se pudo desactivar el usuario rol",
        body: [],
        };
    }

    return {
        status: true,
        message: "Usuario rol desactivado correctamente",
        body: usuarioRolDesactivado,
    };
}
export default {
    obtenerRolesPorUsuarioService,
    crearUsuarioRolService,
    cambiarEstadoUsuarioRolService,
}