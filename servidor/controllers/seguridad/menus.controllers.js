import menusUseCase from "../../aplicacion/seguridad/menusUseCase.js";

const obtenerMenus = async (req, res) => {
    try {
        const menus = await menusUseCase.obtenerMenusService();
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
        const { nombre, path, icono, id_menu_padre, descripcion } = req.body;
        const menuCreado = await menusUseCase.crearMenuService(
        nombre,
        path,
        icono,
        descripcion,
        id_menu_padre
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

export default {
    obtenerMenus,
    obtenerMenu,
    obtenerSubmenus,
    crearMenu,
};