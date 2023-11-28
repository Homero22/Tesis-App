import {Menu} from "../../models/esquemaSeguridad/menus.model.js";

 const getAllMenus = async () => {
    try {
        const menus = await Menu.findAll({});
        return menus;
    } catch (error) {
        console.log(error);
    }
 }

 const createMenu = async (menu) => {
    try {
        const menuCreado = await Menu.create(menu);
        return menuCreado;
    } catch (error) {
        console.log(error);
    }
 }

 const getMenuPorId = async (id) => {
    try {
        const menu = await Menu.findOne({
            where: {
                int_menu_id: id
            },
            raw: true
        });
        return menu;
    } catch (error) {
        console.log(error);
    }
 }

 const actualizarMenu = async (id, menu) => {
    try {
        const menuActualizado = await Menu.update({
            str_menu_nombre: menu.str_menu_nombre,
            str_menu_descripcion: menu.str_menu_descripcion,
            str_menu_path: menu.str_menu_path,
            str_menu_icono: menu.str_menu_icono,
            int_menu_estado: menu.int_menu_estado,
            int_menu_padre_id: menu.int_menu_padre_id
        }, {
            where: {
                int_menu_id: id
            }
        });
        
        return menuActualizado;
       
    } catch (error) {
        console.log(error);
    }
}

const createMenus = async (menus) => {
    try {
        const menusCreados = await Menu.bulkCreate(menus);
        return menusCreados;
    } catch (error) {
        console.log(error);
    }
}

const comprobarMenusPorNombres = async (menus) => {
    try {
        const menusEncontrados = await Menu.findAll({
            where: {
                str_menu_nombre: menus
            },
            raw: true
        });
        return menusEncontrados;
    }catch (error) {
        console.log(error);
    }
}
const comprobarMenuPorNombre = async (nombreMenu) => {
    try {
        const menuEncontrado = await Menu.findOne({
            where: {
                str_menu_nombre: nombreMenu
            },
            raw: true
        });
        return menuEncontrado;
    }catch (error) {
        console.log(error);
    }
}
const getSubmenusPorId = async (id) => {
    try {
        const submenus = await Menu.findAll({
            where: {
                int_menu_padre_id: id
            },
            raw: true
        });
        return submenus;
    } catch (error) {
        console.log(error);
    }

}



 export default {
        getAllMenus,
        createMenu,
        getMenuPorId,
        actualizarMenu,
        createMenus,
        comprobarMenusPorNombres,
        getSubmenusPorId,
        comprobarMenuPorNombre
}