import {Menu} from "../../models/esquemaSeguridad/menus.model.js";
import { Op } from "sequelize";
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
            int_menu_padre_id: menu.int_menu_padre_id,
            dt_fecha_actualizacion: new Date()
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
const buscarMenu = async (texto,page) => {
    try {
        const skip = (page - 1) * 10;
        //buscar por todos los campos con iLike
        const menus = await Menu.findAll({
            where: {
                [Op.or]: [
                {
                    str_menu_nombre: {
                        [Op.iLike]: `%${texto}%`
                    }
                },
                {
                    str_menu_path: {
                        [Op.iLike]: `%${texto}%`
                    }
                },
                {
                    str_menu_icono: {
                        [Op.iLike]: `%${texto}%`
                    }
                },
                {
                    str_menu_descripcion: {
                        [Op.iLike]: `%${texto}%`
                    }
                }
                ],

            },
            order:[
                ['dt_fecha_actualizacion','DESC']
            ],
            offset: skip,
            limit: 10,
        });
        //obtener el total de roles con el texto
        const totalMenus = await Menu.count({
            where: {
                [Op.or]: [
                {
                    str_menu_nombre: {
                        [Op.iLike]: `%${texto}%`
                    }
                },
                {
                    str_menu_path: {
                        [Op.iLike]: `%${texto}%`
                    }
                },
                {
                    str_menu_icono: {
                        [Op.iLike]: `%${texto}%`
                    }
                },
                {
                    str_menu_descripcion: {
                        [Op.iLike]: `%${texto}%`
                    }
                }
                ],
            },
            order:[
                ['dt_fecha_actualizacion','DESC']
            ],
        });
        const data = {
            menus,
            totalMenus
        }
        return data;
    } catch (error) {
        console.log(error);
    }

}
const filtrarMenus = async (texto,page) => {
    try {
        const skip = (page - 1) * 10;
        const menus = await Menu.findAll({
            where: {
                [Op.or]: [
                {
                    str_menu_nombre: {
                        [Op.like]: `${texto}`
                    }
                },
                {
                    str_menu_path: {
                        [Op.like]: `${texto}`
                    }
                },
                {
                    str_menu_icono: {
                        [Op.like]: `${texto}`
                    }
                },
                {
                    str_menu_descripcion: {
                        [Op.like]: `${texto}`
                    }
                },
                {
                    str_menu_estado: {
                        [Op.like]: `${texto}`
                    }
                }
                ]
            },
            order:[
                ['dt_fecha_actualizacion','DESC']
            ],
            offset: skip,
            limit: 10
        });
        //obtener la cantidad de registros con el texto
        const totalMenus = await Menu.count({
            where: {
                [Op.or]: [
                {
                    str_menu_nombre: {
                        [Op.like]: `${texto}`
                    }
                },
                {
                    str_menu_path: {
                        [Op.like]: `${texto}`
                    }
                },
                {
                    str_menu_icono: {
                        [Op.like]: `${texto}`
                    }
                },
                {
                    str_menu_descripcion: {
                        [Op.like]: `${texto}`
                    }
                },
                {
                    str_menu_estado: {
                        [Op.like]: `${texto}`
                    }
                }
                ]
            },
        });
        const data = {
            menus,
            totalMenus
        }
        
        return data;
    } catch (error) {
        console.log(error);
    }
}
const desactivarMenu = async (id,estado) => {
    try {
        const menuDesactivado = await Menu.update({
            str_menu_estado: estado,
            dt_fecha_actualizacion: new Date()
        }, {
            where: {
                int_menu_id: id
            }
        });
        return menuDesactivado;
    } catch (error) {
        console.log(error);
    }
}
const obtenerMenusConPaginacion = async(pagina,cantidad) => {
    try {
        const skip = (pagina - 1) * cantidad;
        const menus = await Menu.findAll({
            offset: skip,
            limit: cantidad,
            order:[
                ['dt_fecha_actualizacion','DESC']
            ]
        });
        return menus;
    } catch (error) {
        console.log(error);
    }
}
const obtenerTotalMenus = async() => {
    try {
        const totalMenus = await Menu.count();
        return totalMenus;
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
    comprobarMenuPorNombre,
    buscarMenu,
    filtrarMenus,
    desactivarMenu,
    obtenerMenusConPaginacion,
    obtenerTotalMenus
}