import menuRepository from "../../repositories/seguridad/menuRepository.js";
import { paginacion,validarPaginacion, obtenerDataQueryPaginacion } from "../utils/paginacion.utils.js";
import permisosService from "../../aplicacion/seguridad/permisosUseCase.js"

const obtenerMenusService = async (query) => {
    const validacion = validarPaginacion(query);
    if (validacion != true) {
        return validacion;
    }
    //obtener los datos de la query
    const { page, limit } = obtenerDataQueryPaginacion(query);
    //obtener todos los menus
    const menus = await menuRepository.obtenerMenusConPaginacion(page, limit);
    //obtener el total de registros de menus
    const totalMenus = await menuRepository.obtenerTotalMenus();
    if (menus.length > 0) {
        const metadata = paginacion(page, limit, totalMenus);
        return {
        status: true,
        message: "Menus encontrados",
        body: menus,
        metadata: {
            pagination: metadata,
        },
        };
    }
    return {
        status: false,
        message: "No se encontraron menus",
        body: [],
    };

};
const obtenerMenuService = async (id) => {
    let respuesta = {};
    //comprobar que el id sea un numero y no sea decimal
    if (isNaN(id) || id % 1 != 0) {
        respuesta = {
        status: false,
        message: "El id debe ser un número entero",
        body: [],
        };
        return respuesta;
    }
    
    //obtener el menu por id
    const menu = await menuRepository.getMenuPorId(id);
    
    if (menu) {
        respuesta = {
        status: true,
        message: "Menu encontrado",
        body: menu,
        };
    } else {
        respuesta = {
        status: false,
        message: "No se encontró el menu",
        body: [],
        };
    }
    
    return respuesta;
}
const obtenerSubmenusService = async (id) => {
    let respuesta = {};
    //comprobar que el id sea un numero y no sea decimal
    if (isNaN(id) || id % 1 != 0) {
        respuesta = {
        status: false,
        message: "El id debe ser un número entero",
        body: [],
        };
        return respuesta;
    }
    
    //obtener el menu por id
    const submenus = await menuRepository.getSubmenusPorId(id);
    
    if (submenus.length > 0) {
        const metadata = paginacion(1, submenus.length, submenus.length);
        respuesta = {
        status: true,
        message: "Submenus encontrados",
        body: submenus,
        metadata: {
            pagination: metadata,
        },
        };
    } else {
        respuesta = {
        status: false,
        message: "No se encontraron submenus",
        body: [],
        metadata: {
            pagination: {
            previousPage: 0,
            currentPage: 1,
            nextPage: null,
            total: submenus.length,
            limit: submenus.length,
            },
        },
        };
    }
    
    return respuesta;
}
const crearMenuService = async (
    nombre,
    path,
    icono,
    descripcion,
    id_menu_padre
) => {
    let respuesta = {};
    //comprobar que el id_menu_padre sea un numero y no sea decimal
    if (isNaN(id_menu_padre) || id_menu_padre % 1 != 0) {
        respuesta = {
        status: false,
        message: "El id_menu_padre debe ser un número entero",
        body: [],
        };
        return respuesta;
    }
     
    //comprobar que el menu no exista
    const menuEncontrado = await menuRepository.comprobarMenuPorNombre(
        nombre
    );
    
    
    if(menuEncontrado){
        respuesta = {
        status: false,
        message: "El menu ya existe",
        body: [],
        };
        return respuesta;
    }
    //creo el objeto
    const menu = {
        str_menu_nombre: nombre,
        str_menu_path: path,
        str_menu_icono: icono,
        str_menu_descripcion: descripcion,
        int_menu_padre_id: id_menu_padre,
    };
    //crear el menu
    const menuCreado = await menuRepository.createMenu(menu);

    if(!menuCreado){
        respuesta = {
        status: false,
        message: "No se pudo crear el menu",
        body: [],
        };
        return respuesta;
    }

    //Cuando se crea un nuevo Menu , se debe actualizar la tabla permisos con el int_menu_id que se crea recientemente y debemos obtener
    //tods los int_usuario_rol_id de UsuarioRol para completar los permisos.

    //llamo al permisosService enviandole el int_menu_id creado
    console.log("Id del menu creado",menuCreado.int_menu_id)
    const permisosActualizados = await permisosService.crearPermisosPorIdMenuService(menuCreado.int_menu_id)

    if(!permisosActualizados){
        respuesta ={
            status: false,
            message: "No se pudo actualizar los permisos",
            body: [],
        }
        return respuesta;
    }

    respuesta = {
        status: true,
        message: "Menu creado",
        body: menuCreado,
    };


    

    
    return respuesta;
};
const actualizarMenuService = async (id, nombre, path, icono, descripcion, id_menu_padre) => {
    let respuesta = {};
    console.log(id);
    console.log(id_menu_padre)
    //comprobar que el id_menu_padre sea un numero entero
    if(isNaN(id_menu_padre) || isNaN(id)){
        respuesta = {
        status: false,
        message: "El id_menu_padre debe ser un número entero",
        body: [],
        };
        return respuesta;
    }

    
    //creo el objeto
    const menu = {
        str_menu_nombre: nombre,
        str_menu_path: path,
        str_menu_icono: icono,
        str_menu_descripcion: descripcion,
        int_menu_padre_id: id_menu_padre,
    };
    
    //actualizar el menu
    const menuActualizado = await menuRepository.actualizarMenu(id,menu);
    
    if (menuActualizado) {
        respuesta = {
        status: true,
        message: "Menu actualizado",
        body: menuActualizado,
        };
    } else {
        respuesta = {
        status: false,
        message: "No se pudo actualizar el menu",
        body: [],
        };
    }
    
    return respuesta;
};
const desactivarMenuService = async (id) => {
    let respuesta = {};
    //comprobar que el id sea un numero y no sea decimal
    if (isNaN(id) || id % 1 != 0) {
        respuesta = {
        status: false,
        message: "El id debe ser un número entero",
        body: [],
        };
        return respuesta;
    }
    
    //comprobar que el menu exista
    const menuEncontrado = await menuRepository.getMenuPorId(id);

    if (!menuEncontrado) {
        respuesta = {
        status: false,
        message: "El menu no existe",
        body: [],
        };
        return respuesta;
    }
    let estado = menuEncontrado.str_menu_estado;
    if(estado =="ACTIVO"){
        estado = "INACTIVO";
    }else{
        estado = "ACTIVO";
    }
    
    //desactivar el menu
    const menuDesactivado = await menuRepository.desactivarMenu(id,estado);
    
    if (menuDesactivado) {
        return {
        status: true,
        message: "Se ha cambiado el estado del menú",
        body: menuDesactivado,
        };
    } else {
        return{
        status: false,
        message: "No se pudo cambiar el estado del menú",
        body: [],
        };
    }
    
};
const filtrarMenusService = async (texto, page) => {
    page = parseInt(page);
    const {menus, totalMenus} = await menuRepository.filtrarMenus(texto,page);
    console.log("TOTAL",totalMenus)
    if(menus.length > 0){
        const metadata = paginacion(page, 10, totalMenus);
        console.log(metadata);
        return {
            status: true,
            message: "Menus encontrados",
            body: menus,
            metadata: {
                pagination: metadata,
            },
        };
    }else{
        return {
            status: false,
            message: "No se encontraron menus",
            body: [],
            metadata:{
                pagination:{
                    previousPage:0,
                    currentPage:1,
                    nextPage:null,
                    total:menus.length,
                    limit:menus.length
                }
            }
        }
    }
};
const buscarMenuService = async ( texto,page) => {

    page = parseInt(page);
    const {menus, totalMenus} = await menuRepository.buscarMenu(texto,page);
    if(menus.length > 0){
        const metadata = paginacion(page, 10, totalMenus);
        return {
            status: true,
            message: "Menus encontrados",
            body: menus,
            metadata: {
                pagination: metadata,
            },
        };
    }else{
        return {
            status: false,
            message: "No se encontraron menus",
            body: [],
            metadata:{
                pagination:{
                    previousPage:0,
                    currentPage:1,
                    nextPage:null,
                    total:menus.length,
                    limit:menus.length
                }
            }
        }
    }
};
const obtenerMenusSinPaginacionService = async () => {
    const menus = await menuRepository.getAllMenus();
    if (menus.length > 0) {
        return {
        status: true,
        message: "Menus encontrados",
        body: menus,
        };
    }
    return {
        status: false,
        message: "No se encontraron menus",
        body: [],
    };

};

export default {
    obtenerMenusService,
    obtenerMenuService,
    obtenerSubmenusService,
    crearMenuService,
    actualizarMenuService,
    desactivarMenuService,
    filtrarMenusService,
    buscarMenuService,
    obtenerMenusSinPaginacionService
};
