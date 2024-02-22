import permisosRepository from "../../repositories/seguridad/permisoRepository.js";
import usuarioRolRepository from "../../repositories/seguridad/usuarioRolRepository.js";
import menuRepository from "../../repositories/seguridad/menuRepository.js";

const obtenerPermisosPorIdUsuarioRolService = async (idUsuarioRol) => {
    let respuesta = {};
    //comprobar que el id sea un numero y no sea decimal
    // if (isNaN(idUsuarioRol) || idUsuarioRol % 1 != 0) {
    //     respuesta = {
    //         status: false,
    //         message: "El id debe ser un número entero",
    //         body: [],
    //     };
    //     return respuesta;
    // }
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

    const data = await permisosRepository.getMenusPermisosPorIdUsuarioRol(idUsuarioRol);
    if (data.length == 0) {
        respuesta = {
            status: false,
            message: "No se encontraron permisos",
            body: [],
        };
        return respuesta;
    }
    respuesta = {
        status: true,
        message: "Permisos encontrados",
        body: data,
    };

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

const crearPermisosPorIdUsuarioRolService = async (idUsuarioRol) => {
   //con el int_usuario_rol_id debo darle permisos de todos los menus


   //obtengo todos los menus que existen
   const menus = await menuRepository.getAllMenus();
    if (!menus) {
         return {
              status: false,
              message: "No se encontraron menus",
              body: [],
         };
    }
    //recorro el arreglo de menus y creo un permiso por cada menu  por defecto todos los permisos son false
    //añado el int_usuario_rol_id y el int_menu_id y los permisos por defecto en el arreglo de permisos

    const permisos = [];

    for (let i = 0; i < menus.length; i++) {
         const menu = menus[i];
         const permiso = {
              int_usuario_rol_id: idUsuarioRol,
              int_menu_id: menu.int_menu_id,
              bln_permiso_crear: false,
              bln_permiso_editar: false,
              bln_permiso_eliminar: false,
              bln_permiso_ver: false,
         };
         permisos.push(permiso);
    }

    //comprobar que los permisos no existan
    const permisosEncontrado = await permisosRepository.comprobarPermisos(permisos);
    
    if(permisosEncontrado.length===0){
            console.log("Creando permisos");
            const permisosCreados = await permisosRepository.createPermisos(permisos);
            if (permisosCreados) {
                console.log("Permisos creados");
            }
    }

    return {
        status: true,
        message: "Permisos creados correctamente",
        body: [],
    };



}

const crearPermisosPorIdMenuService = async (int_menu_id) =>{
    //con el int_menu_id debo darle permisos a todos los int_usuario_rol_id que existen
    //obtengo todos los int_usuario_rol_id

    const usuarioRoles = await usuarioRolRepository.getAllUsuarioRoles();

    if(!usuarioRoles){
        return {
            status: false,
            message: "No se encontraron usuarioRoles",
            body: [],
        };
    }

    //recorro el arreglo de usuarioRoles y creo un permiso por cada usuarioRol  por defecto todos los permisos son false

    const permisos = [];

    for (let i = 0; i < usuarioRoles.length; i++) {
        const usuarioRol = usuarioRoles[i];
        const permiso = {
            int_usuario_rol_id: usuarioRol.int_usuario_rol_id,
            int_menu_id: int_menu_id,
            bln_permiso_crear: false,
            bln_permiso_editar: false,
            bln_permiso_eliminar: false,
            bln_permiso_ver: false,
        };
        permisos.push(permiso);
    }

    //comprobar que los permisos no existan

    const permisosEncontrado = await permisosRepository.comprobarPermisos(permisos);

    if(permisosEncontrado.length===0){

        await permisosRepository.createPermisos(permisos);

    }

    return {
        status: true,
        message: "Permisos creados correctamente",
        body: [],
    };

}

export default { 
    obtenerPermisosPorIdUsuarioRolService,
    actualizarPermisosPorIdUsuarioRolService,
    crearPermisosPorIdUsuarioRolService,
    crearPermisosPorIdMenuService
};