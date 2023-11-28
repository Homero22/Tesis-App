import menuRepository from "../../repositories/seguridad/menuRepository.js";

const obtenerMenusService = async () => {
    //obtener todos los menus
    const menus = await menuRepository.getAllMenus();
    
    let respuesta = {};
    
    if (menus.length > 0) {
        respuesta = {
        status: true,
        message: "Menus encontrados",
        body: menus,
        };
    } else {
        respuesta = {
        status: false,
        message: "No se encontraron menus",
        body: [],
        };
    }
    
    return respuesta;
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
        respuesta = {
        status: true,
        message: "Submenus encontrados",
        body: submenus,
        };
    } else {
        respuesta = {
        status: false,
        message: "No se encontraron submenus",
        body: [],
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
    
    if (menuCreado) {
        respuesta = {
        status: true,
        message: "Menu creado",
        body: menuCreado,
        };
    } else {
        respuesta = {
        status: false,
        message: "No se pudo crear el menu",
        body: [],
        };
    }
    
    return respuesta;
};

export default {
    obtenerMenusService,
    obtenerMenuService,
    obtenerSubmenusService,
    crearMenuService,

};
