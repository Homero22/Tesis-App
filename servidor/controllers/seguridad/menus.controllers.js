import menusUseCase from "../../aplicacion/seguridad/menusUseCase.js";

import jwt from "jsonwebtoken";
import { jwtVariables } from "../../configuracion/variablesGlobales.js";

import permisosUseCase from "../../aplicacion/seguridad/permisosUseCase.js";

import usuarioRolUseCase from "../../aplicacion/usuarios/usuarioRolUseCase.js";

import rolesUseCase from "../../aplicacion/seguridad/rolesUseCase.js";

const obtenerMenus = async (req, res) => {
    try {
        const query = req.query;
        const menus = await menusUseCase.obtenerMenusService(query);
        res.json(menus);
    } catch (error) {
        res.status(500).json({
        status: false,
        message: "Error en el servidor" + error,
        body: [],
        });
    }
};
const obtenerMenusSinPaginacion = async (req, res) => {
    try {
        const menus = await menusUseCase.obtenerMenusSinPaginacionService();
        res.json(menus);
    } catch (error) {
        res.status(500).json({
        status: false,
        message: "Error en el servidor" + error,
        body: [],
        });
    }
};
const obtenerMenu = async (req, res) => {
    try {
        const { id } = req.params;
        const menu = await menusUseCase.obtenerMenuService(id);
        res.json(menu);
    } catch (error) {
        res.status(500).json({
        status: false,
        message: "Error en el servidor" + error,
        body: [],
        });
    }
};

const obtenerSubmenus = async (req, res) => {
    try {
        const { id } = req.params;
        const submenus = await menusUseCase.obtenerSubmenusService(id);
        res.json(submenus);
    } catch (error) {
        res.status(500).json({
        status: false,
        message: "Error en el servidor" + error,
        body: [],
        });
    }
};

const crearMenu = async (req, res) => {
    try {
        const {menu} = req.body;
        const menuCreado = await menusUseCase.crearMenuService(
        menu.str_menu_nombre,
        menu.str_menu_path,
        menu.str_menu_icono,
        menu.str_menu_descripcion,
        menu.int_menu_padre_id
        );
        res.json(menuCreado);
    } catch (error) {
        res.status(500).json({
        status: false,
        message: "Error en el servidor" + error,
        body: [],
        });
    }
};

const buscarMenu = async (req, res) => {
    try {
        const { texto,page } = req.query;
        const menu = await menusUseCase.buscarMenuService(texto,page);
        res.json(menu);
    } catch (error) {
        res.status(500).json({
        status: false,
        message: "Error en el servidor" + error,
        body: [],
        });
    }
};

const filtrarMenus = async (req, res) => {
    try {
        const { filtro,page } = req.query;
        const menus = await menusUseCase.filtrarMenusService(filtro,page);
        res.json(menus);
    } catch (error) {
        res.status(500).json({
        status: false,
        message: "Error en el servidor" + error,
        body: [],
        });
    }
};

const actualizarMenu = async (req, res) => {
    try {
        let { id } = req.params;
        const{menu} = req.body;
        const menuE = await menusUseCase.actualizarMenuService(
        id,
        menu.str_menu_nombre,
        menu.str_menu_path,
        menu.str_menu_icono,
        menu.str_menu_descripcion,
        menu.int_menu_padre_id,
        );
        res.json(menuE);
    } catch (error) {
        res.status(500).json({
        status: false,
        message: "Error en el servidor" + error,
        body: [],
        });
    }
}

const desactivarMenu = async (req, res) => {
    try {
        const { id } = req.params;
        const menu = await menusUseCase.desactivarMenuService(id);
        res.json(menu);
    } catch (error) {
        res.status(500).json({
        status: false,
        message: "Error en el servidor" + error,
        body: [],
        });
    }
}

const obtenerMenusAndSubmenus = async (req, res) => {
    //corregir error en la obtencion de los menus por rol ( int_rol_id)
    try {
        const { rol } = req.params;
        const {token} = req.cookies;
        const dataCookie = jwt.verify(token, jwtVariables.jwtSecret);
        //obtengo el int_rol_id dado un rol
        const idRol = await rolesUseCase.obtenerIdRolByNameService(rol);

        //obtener el int_usuario_rol_id del usuario logueado dado el rol
        const usuario = await usuarioRolUseCase.obtenerIdUsuarioRolService(idRol, dataCookie.int_usuario_id);

        

        const permisosMenus = await permisosUseCase.obtenerPermisosPorIdUsuarioRolService(usuario.body.int_usuario_rol_id);

        const menus = await menusUseCase.obtenerMenusAndSubmenusService2(permisosMenus);
        res.json(menus);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: false,
            message: "Error en el servidor" + error,
            body: [],
        });
    }

}



export default {
    obtenerMenus,
    obtenerMenu,
    obtenerSubmenus,
    crearMenu,
    buscarMenu,
    filtrarMenus,
    actualizarMenu,
    desactivarMenu,
    obtenerMenusSinPaginacion,
    obtenerMenusAndSubmenus
};