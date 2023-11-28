import permisosRepository from "../../repositories/seguridad/permisoRepository.js";
import usuarioRolRepository from "../../repositories/seguridad/usuarioRolRepository.js";
import menuRepository from "../../repositories/seguridad/menuRepository.js";

const obtenerPermisosPorIdUsuarioRolService = async (idUsuarioRol) => {
    let respuesta = {};
    //comprobar que el id sea un numero y no sea decimal
    if (isNaN(idUsuarioRol) || idUsuarioRol % 1 != 0) {
        respuesta = {
            status: false,
            message: "El id debe ser un número entero",
            body: [],
        };
        return respuesta;
    }
    //comprobar que el idUsuarioRol exista
    const usuarioRol = await usuarioRolRepository.getUsuarioRolPorId(idUsuarioRol);
    if (!usuarioRol) {
        respuesta = {
            status: false,
            message: "El idUsuarioRol no existe",
            body: [],
        };
        return respuesta;
    }

    //obtener los permisos por idUsuarioRol
    const permisos = await permisosRepository.getPermisosPorIdUsuarioRol(idUsuarioRol);

    if (permisos.length > 0) {
        //obtengo el nombre del menu, icono y le agrego a cada permiso
        for (let i = 0; i < permisos.length; i++) {
            const menu = await menuRepository.getMenuPorId(permisos[i].int_menu_id);
            permisos[i].int_menu_padre_id = menu.int_menu_padre_id;
            permisos[i].str_menu_nombre = menu.str_menu_nombre;
            permisos[i].str_menu_icono = menu.str_menu_icono;
        }

        respuesta = {
            status: true,
            message: "Permisos encontrados",
            body: permisos,
        };
    } else {
        respuesta = {
            status: false,
            message: "No se encontraron permisos",
            body: [],
        };
    }

    return respuesta;
};

const actualizarPermisosPorIdUsuarioRolService = async (idUsuarioRol, permisos) => {
    let respuesta = {};
    //comprobar que el idUsuarioRol exista
    const usuarioRol = await usuarioRolRepository.getUsuarioRolPorId(idUsuarioRol);
    if (!usuarioRol) {
        respuesta = {
            status: false,
            message: "El idUsuarioRol no existe",
            body: [],
        };
        return respuesta;
    }

    //comprobar que el idUsuarioRol no sea 1 (Administrador)
    // if (idUsuarioRol == 1) {
    //     respuesta = {
    //         status: false,
    //         message: "No se puede actualizar los permisos del Administrador",
    //         body: [],
    //     };
    //     return respuesta;
    // }

    //comprobar que el arreglo de permisos no este vacio
    if (permisos.length == 0) {
        respuesta = {
            status: false,
            message: "El arreglo de permisos no puede estar vacio",
            body: [],
        };
        return respuesta;
    }
    
    //actualizar los permisos en base al ejemplo de arriba recorriendo el arreglo
    for (let i = 0; i < permisos.length; i++) {
        const permiso = permisos[i];
        //comprobar que el id_menu exista
        const menu = await menuRepository.getMenuPorId(permiso.int_menu_id);
        if (!menu) {
            respuesta = {
                status: false,
                message: `El id_menu ${permiso.int_menu_id} no existe`,
                body: [],
            };
            return respuesta;
        }
        //comprobar que los permisos sean true o false
        if (
            permiso.bln_permiso_crear !== true &&
            permiso.bln_permiso_crear !== false ||
            permiso.bln_permiso_editar !== true &&
            permiso.bln_permiso_editar !== false ||
            permiso.bln_permiso_eliminar !== true &&
            permiso.bln_permiso_eliminar !== false ||
            permiso.bln_permiso_ver !== true &&
            permiso.bln_permiso_ver !== false
        ) {
            respuesta = {
                status: false,
                message: "Los permisos deben ser true o false",
                body: [],
            };
            return respuesta;
        }
        const per = {
            bln_permiso_ver: permiso.bln_permiso_ver,
            bln_permiso_crear: permiso.bln_permiso_crear,
            bln_permiso_editar: permiso.bln_permiso_editar,
            bln_permiso_eliminar: permiso.bln_permiso_eliminar,
        }
        //actualizar el permiso dado el permiso[i].int_menu_id, idUsuarioRol, permiso[i].bln_crear, permiso[i].bln_editar, permiso[i].bln_eliminar, permiso[i].bln_ver
        const permisoActualizado = await permisosRepository.actualizarPermiso(
            permiso.int_menu_id,
            idUsuarioRol,
            per
        );
        if (!permisoActualizado) {
            respuesta = {
                status: false,
                message: "No se pudo actualizar el permiso",
                body: [],
            };
            return respuesta;
        }
    }
    return respuesta = {
        status: true,
        message: "Permisos actualizados correctamente",
        body: [],
    };


};

export default { 
    obtenerPermisosPorIdUsuarioRolService,
    actualizarPermisosPorIdUsuarioRolService
};