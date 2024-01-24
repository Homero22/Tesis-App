import menuRepository from "../../repositories/seguridad/menuRepository.js";
import { paginacion,validarPaginacion, obtenerDataQueryPaginacion } from "../utils/paginacion.utils.js";
import permisosService from "../../aplicacion/seguridad/permisosUseCase.js"
import { or } from "sequelize";

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

const obtenerMenusAndSubmenusService = async () => {
    let menus = await menuRepository.getAllMenusAndSubmenus();
    if(!menus){
        return {
            status: false,
            message: "No se encontraron menus",
            body: [],
        };
    }


    /**
     * [
        {
            "int_menu_id": 2,
            "int_menu_padre_id": 1,
            "str_menu_nombre": "Inicio",
            "str_menu_descripcion": "Bienvenida",
            "str_menu_path": "welcome",
            "str_menu_icono": "home",
            "str_menu_estado": "ACTIVO",
            "dt_fecha_creacion": "2024-01-17T16:18:14.910Z",
            "dt_fecha_actualizacion": "2024-01-17T16:18:14.910Z"
        },
        {
            "int_menu_id": 3,
            "int_menu_padre_id": 1,
            "str_menu_nombre": "Ajustes",
            "str_menu_descripcion": "Seguridad",
            "str_menu_path": "ajustes",
            "str_menu_icono": "settings",
            "str_menu_estado": "ACTIVO",
            "dt_fecha_creacion": "2024-01-17T16:18:14.910Z",
            "dt_fecha_actualizacion": "2024-01-17T16:18:14.910Z"
        },
        {
            "int_menu_id": 4,
            "int_menu_padre_id": 3,
            "str_menu_nombre": "Roles",
            "str_menu_descripcion": "Roles del usuario",
            "str_menu_path": "ajustes/roles",
            "str_menu_icono": "subdirectory_arrow_right",
            "str_menu_estado": "ACTIVO",
            "dt_fecha_creacion": "2024-01-17T16:18:14.910Z",
            "dt_fecha_actualizacion": "2024-01-17T16:18:14.910Z"
        },
        {
            "int_menu_id": 5,
            "int_menu_padre_id": 3,
            "str_menu_nombre": "Mi cuenta",
            "str_menu_descripcion": "información del usuario",
            "str_menu_path": "ajustes/cuenta",
            "str_menu_icono": "subdirectory_arrow_right",
            "str_menu_estado": "ACTIVO",
            "dt_fecha_creacion": "2024-01-17T16:18:14.910Z",
            "dt_fecha_actualizacion": "2024-01-17T16:18:14.910Z"
        },
        {
            "int_menu_id": 6,
            "int_menu_padre_id": 3,
            "str_menu_nombre": "Menus",
            "str_menu_descripcion": "Todos los menus del sistema",
            "str_menu_path": "ajustes/menus",
            "str_menu_icono": "subdirectory_arrow_right",
            "str_menu_estado": "ACTIVO",
            "dt_fecha_creacion": "2024-01-17T16:18:14.910Z",
            "dt_fecha_actualizacion": "2024-01-17T16:18:14.910Z"
        },
        {
            "int_menu_id": 7,
            "int_menu_padre_id": 3,
            "str_menu_nombre": "Usuarios",
            "str_menu_descripcion": "Todos los usuarios del sistema",
            "str_menu_path": "ajustes/usuarios",
            "str_menu_icono": "subdirectory_arrow_right",
            "str_menu_estado": "ACTIVO",
            "dt_fecha_creacion": "2024-01-17T16:18:14.910Z",
            "dt_fecha_actualizacion": "2024-01-17T16:18:14.910Z"
        },
        {
            "int_menu_id": 8,
            "int_menu_padre_id": 1,
            "str_menu_nombre": "Reportes",
            "str_menu_descripcion": "Menu de reportes",
            "str_menu_path": "reportes",
            "str_menu_icono": "assignment_turned_in",
            "str_menu_estado": "ACTIVO",
            "dt_fecha_creacion": "2024-01-17T16:18:14.910Z",
            "dt_fecha_actualizacion": "2024-01-17T16:18:14.910Z"
        },
        {
            "int_menu_id": 9,
            "int_menu_padre_id": 1,
            "str_menu_nombre": "Incidencias",
            "str_menu_descripcion": "Menu de incidencias",
            "str_menu_path": "incidencias",
            "str_menu_icono": "assignment_turned_in",
            "str_menu_estado": "ACTIVO",
            "dt_fecha_creacion": "2024-01-17T16:18:14.910Z",
            "dt_fecha_actualizacion": "2024-01-17T16:18:14.910Z"
        },
        {
            "int_menu_id": 10,
            "int_menu_padre_id": 1,
            "str_menu_nombre": "rr",
            "str_menu_descripcion": "r",
            "str_menu_path": "r",
            "str_menu_icono": "3d_rotation",
            "str_menu_estado": "ACTIVO",
            "dt_fecha_creacion": "2024-01-17T16:19:03.548Z",
            "dt_fecha_actualizacion": "2024-01-17T16:19:03.548Z"
        }
    ]
     */

    //organizar los menus y submenus en un array para dar este formato

    /**
     * export interface MenusAndSubmenusModelBody {
  int_menu_id:           number,
  int_menu_padre_id:     number,
  str_menu_nombre:       string,
  str_menu_descripcion:  string,
  str_menu_path:         string,
  str_menu_icono:        string,
  str_menu_estado:      string,
  dt_fecha_creacion:     string,
  dt_fecha_actualizacion: string,
  submenus:              MenusAndSubmenusModelBody[];
}
     */

    for(let i=0; i<menus.length; i++){
        let submenu = await menuRepository.getSubmenusPorId(menus[i].int_menu_id);
        menus[i].submenus = submenu;
    }

    menus = organizarMenus(menus);

    function organizarMenus(menus) {
        // Crear un mapa para almacenar los menús por su ID
        const menuMap = new Map();
      
        // Crear una función recursiva para organizar los menús
        function organizar(menu) {
          // Verificar si el menú ya está en el mapa
          if (!menuMap.has(menu.int_menu_id)) {
            // Si no está en el mapa, agregarlo
            menuMap.set(menu.int_menu_id, menu);
      
            // Verificar si el menú tiene submenús
            if (menu.submenus && menu.submenus.length > 0) {
              // Organizar los submenús recursivamente
              menu.submenus = menu.submenus.map(submenu => organizar(submenu));
            }
      
            return menu;
          } else {
            // Si el menú ya está en el mapa, devolver null para indicar que debe ser omitido
            return null;
          }
        }
      
        // Organizar los menús iniciales
        const menusOrganizados = menus.map(menu => organizar(menu)).filter(menu => menu !== null);
      
        return menusOrganizados;
      }

    console.log(menus);


    return {
        status: true,
        message: "Menus encontrados",
        body: menus,
        };

  

}

export default {
    obtenerMenusService,
    obtenerMenuService,
    obtenerSubmenusService,
    crearMenuService,
    actualizarMenuService,
    desactivarMenuService,
    filtrarMenusService,
    buscarMenuService,
    obtenerMenusSinPaginacionService,
    obtenerMenusAndSubmenusService
};
