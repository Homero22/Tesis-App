import menusUseCase from "../../aplicacion/seguridad/menusUseCase.js";

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
        console.log(submenus);
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
        const { id } = req.params;
        const { nombre, path, icono, descripcion, id_menu_padre } = req.body;
        const menu = await menusUseCase.actualizarMenuService(
        id,
        nombre,
        path,
        icono,
        descripcion,
        id_menu_padre
        );
        res.json(menu);
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
        console.log(id);
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



export default {
    obtenerMenus,
    obtenerMenu,
    obtenerSubmenus,
    crearMenu,
    buscarMenu,
    filtrarMenus,
    actualizarMenu,
    desactivarMenu,
};