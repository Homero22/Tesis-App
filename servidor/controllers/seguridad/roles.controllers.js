import rolesUseCase from "../../aplicacion/seguridad/rolesUseCase.js";

const obtenerRoles = async (req, res) => {
  try {
    const query = req.query;
    const roles = await rolesUseCase.obtenerRolesService(query);
    res.json(roles);
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Error en el servidor" + error,
      body: [],
    });
  }
};

const obtenerRol = async (req, res) => {
    try {
        const { id } = req.params;
        const rol = await rolesUseCase.obtenerRolService(id);
        res.json(rol);
    } catch (error) {
        res.status(500).json({
        status: false,
        message: "Error en el servidor" + error,
        body: [],
        });
    }
};

const crearRol = async (req, res) => {
    try {
        const { nombre, descripcion } = req.body;
        const rol = await rolesUseCase.crearRolService(nombre, descripcion);
        res.json(rol);
    } catch (error) {
        res.status(500).json({
        status: false,
        message: "Error en el servidor" + error,
        body: [],
        });
    }
};

const actualizarRol = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion } = req.body;
        const rol = await rolesUseCase.actualizarRolService(id, nombre, descripcion);
        res.json(rol);
    } catch (error) {
        res.status(500).json({
        status: false,
        message: "Error en el servidor" + error,
        body: [],
        });
    }
}
const desactivarRol = async (req, res) => {
    try {
        const { id } = req.params;
        const rol = await rolesUseCase.desactivarRolService(id);
        res.json(rol);
    } catch (error) {
        res.status(500).json({
        status: false,
        message: "Error en el servidor" + error,
        body: [],
        });
    }
}
const buscarRol = async (req, res) => {
    try {
        const { texto,page } = req.query;

        const rol = await rolesUseCase.buscarRolService(texto,page);
        res.json(rol);
    } catch (error) {
        res.status(500).json({
        status: false,
        message: "Error en el servidor" + error,
        body: [],
        });
    }
}
const filtrarRoles = async (req, res) => {
    try {
        const { filtro,page } = req.query;
        const roles = await rolesUseCase.filtrarRolesService(filtro,page);
        res.json(roles);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
        status: false,
        message: "Error en el servidor" + error,
        body: [],
        });
    }
}

export default {
    obtenerRoles,
    obtenerRol,
    crearRol,
    actualizarRol,
    desactivarRol,
    buscarRol,
    filtrarRoles,
};
