import {Permiso} from '../../models/esquemaSeguridad/permisos.model.js';

const getAllPermisos = async () => {
    try {
        const permisos = await Permiso.findAll({});
        return permisos;
    } catch (error) {
        console.log(error);
    }
}

const createPermiso = async (permiso) => {
    try {
        const permisoCreado = await Permiso.create(permiso);
        return permisoCreado;
    } catch (error) {
        console.log(error);
    }
}

const getPermisosPorIdUsuarioRol = async (idUsuarioRol)=>{
    try {
        const permisos = await Permiso.findAll({
            where: {
                int_usuario_rol_id: idUsuarioRol
            },
            raw: true
        });
        return permisos;
    } catch (error) {
        console.log(error);
    }

}
const actualizarPermiso = async (idMenu ,idUsuarioRol, permiso,  ) => {
    try {
        const permisoActualizado = await Permiso.update({
            str_permiso_estado: permiso.str_permiso_estado,
            bln_permiso_ver: permiso.bln_permiso_ver,
            bln_permiso_crear: permiso.bln_permiso_crear,
            bln_permiso_editar: permiso.bln_permiso_editar,
            bln_permiso_eliminar: permiso.bln_permiso_eliminar,
            int_usuario_rol_id: permiso.int_usuario_rol_id
        }, {
            where: {
                int_usuario_rol_id: idUsuarioRol,
                int_menu_id: idMenu
            }
        });
        
        return permisoActualizado;
       
    } catch (error) {
        console.log(error);
    }
}
const createPermisos = async (permisos) => {
    try {
        const permisosCreados = await Permiso.bulkCreate(permisos);
        return permisosCreados;
    } catch (error) {
        console.log(error);
    }
}

//funcion para comprobar que los permisos no existan dado el int_usuario_rol_id y el int_menu_id
const comprobarPermisos = async (permisos) => {
    try {
        const permisosEncontrados = await Permiso.findAll({
            where: {
                int_usuario_rol_id: permisos.map(permiso => permiso.int_usuario_rol_id),
                int_menu_id: permisos.map(permiso => permiso.int_menu_id)
            },
            raw: true
        });
        return permisosEncontrados;
    } catch (error) {
        console.log(error);
    }
}




export default {
    getAllPermisos,
    createPermiso,
    getPermisosPorIdUsuarioRol,
    actualizarPermiso,
    createPermisos,
    comprobarPermisos

}