import rolRepository from "../../repositories/seguridad/rolRepository.js";
import {
    paginacion,
    obtenerDataQueryPaginacion,
    validarPaginacion,
  } from "../utils/paginacion.utils.js";

const obtenerRolesService = async (query) => {
    const validacion = validarPaginacion(query);
    if (validacion != true) {
      return validacion;
    }
    //obtener los datos de la query
    const { page, limit } = obtenerDataQueryPaginacion(query);
    //obtener todos los roles
    const roles = await rolRepository.obtenerRolesConPaginacion(page, limit);
    //obtener el total de registros de roles
    const totalRoles = await rolRepository.obtenerTotalRoles();
    if (roles.length > 0) {
        const metadata = paginacion(page, limit, totalRoles);
        return {
            status:true,
            message:"Roles encontrados",
            body:roles,
            metadata:{
                pagination:metadata
            }
        };
    }
    return {
        status:false,
        message:"No se encontraron roles",
        body:[]
    };
  

};

const obtenerRolService = async (id) => {
    let respuesta={};
    //comprobar que el id sea un numero y no sea decimal
    if (isNaN(id) || id % 1 != 0) {
        respuesta = {
            status:false,
            message:"El id debe ser un número entero",
            body:[]
        };
        return respuesta;
    }

   
    //obtener todos los roles
    const rol = await rolRepository.getRolPorId(id);
    
    if (rol) {
        respuesta = {
            status:true,
            message:"Rol encontrado",
            body:rol
        };
    }else{
        respuesta = {
            status:false,
            message:"No se encontró el rol",
            body:[]
        };
    }
    
    return respuesta;
    
};

const crearRolService = async (nombre, descripcion) => {
    let respuesta={};
    //comprobar que el nombre no sea vacio
    if (nombre.trim() == "") {
        respuesta = {
            status:false,
            message:"El nombre no puede ser vacío",
            body:[]
        };
        return respuesta;
    }

    //comprobar que la descripcion no sea vacia
    if (descripcion.trim() == "") {
        respuesta = {
            status:false,
            message:"La descripción no puede ser vacía",
            body:[]
        };
        return respuesta;
    }

    //comprobar que el nombre no exista
    const rol = await rolRepository.getRolPorNombre(nombre);
    if (rol) {
        respuesta = {
            status:false,
            message:"El nombre del rol ya existe",
            body:[]
        };
        return respuesta;
    }
    //creo el objeto rol
    const rolInfo = {
        str_rol_nombre: nombre,
        str_rol_descripcion: descripcion,
    };

    //crear el rol
    const rolCreado = await rolRepository.createRol(rolInfo);
    if (rolCreado) {
        respuesta = {
            status:true,
            message:"Rol creado",
            body:[]
        };
    }else{
        respuesta = {
            status:false,
            message:"No se pudo crear el rol",
            body:[]
        };
    }
    return respuesta;
}
const actualizarRolService = async (id, nombre, descripcion) => {
    let respuesta={};
    //comprobar que el id sea un numero y no sea decimal
    if (isNaN(id) || id % 1 != 0) {
        respuesta = {
            status:false,
            message:"El id debe ser un número entero",
            body:[]
        };
        return respuesta;
    }

    //comprobar que el nombre no sea vacio
    if (nombre.trim() == "") {
        respuesta = {
            status:false,
            message:"El nombre no puede ser vacío",
            body:[]
        };
        return respuesta;
    }

    //comprobar que la descripcion no sea vacia
    if (descripcion.trim() == "") {
        respuesta = {
            status:false,
            message:"La descripción no puede ser vacía",
            body:[]
        };
        return respuesta;
    }
    //creo el objeto rol
    const rolInfo = {
        str_rol_nombre: nombre,
        str_rol_descripcion: descripcion,
    };

    //actualizar el rol
    const rolActualizado = await rolRepository.actualizarRol(id, rolInfo);
    if (rolActualizado) {
        respuesta = {
            status:true,
            message:"Rol actualizado",
            body:[]
        };
    }else{
        respuesta = {
            status:false,
            message:"No se pudo actualizar el rol",
            body:[]
        };
    }
    return respuesta;
}

const desactivarRolService = async (id) => {
    const rol = await rolRepository.getRolPorId(id);
    let estado = rol.str_rol_estado;
    console.log(estado);
    if (estado == "ACTIVO") {
        estado = "INACTIVO";
    } else {
        estado = "ACTIVO";
    }
    const rolDesactivado = await rolRepository.desactivarRol(id, estado);
    if (rolDesactivado) {
        return {
            status:true,
            message:"Rol desactivado",
            body:[]
        };
    }
    return {
        status:false,
        message:"No se pudo desactivar el rol",
        body:[]
    };

}
const buscarRolService = async (texto,page) => {
    //convierto page en numero
    page = parseInt(page);
    //llamo a repositorio para buscar el rol dado el texto
    const {roles,totalRoles} = await rolRepository.buscarRol(texto,page);
    if (roles.length > 0) {
        const metadata = paginacion(page, 10, totalRoles);
        return {
            status:true,
            message:"Roles encontrados",
            body:roles,
            metadata:{
                pagination:metadata
            }
        };
    }else{
        return {
            status:false,
            message:"No se encontraron roles",
            body:[],
            metadata:{
                pagination:{
                    previousPage: 0,
                    currentPage: 1,
                    nextPage: null,
                    total: roles.length,
                    limit: roles.length,
                }
            }
        };
    }
}

const filtrarRolesService = async (texto,page) => {
    //convierto page en numero
    page = parseInt(page);
    //llamo a repositorio para buscar el rol dado el texto
    const {roles, totalRoles}= await rolRepository.filtrarRoles(texto,page);
    if (roles.length > 0) {
        const metadata = paginacion(page, 10, totalRoles);
        console.log(metadata);
        return {
            status:true,
            message:"Roles encontrados",
            body:roles,
            metadata:{
                pagination:metadata
            }
        };
    }else{
        return {
            status:false,
            message:"No se encontraron roles",
            body:[],
            metadata:{
                pagination:{
                    previousPage: 0,
                    currentPage: 1,
                    nextPage: null,
                    total: roles.length,
                    limit: roles.length,
                }
            }
        };
    }


}

export default {
    obtenerRolesService,
    obtenerRolService,
    crearRolService,
    actualizarRolService,
    desactivarRolService,
    buscarRolService,
    filtrarRolesService
};