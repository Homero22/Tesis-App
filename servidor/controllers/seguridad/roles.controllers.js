import rolesUseCase from "../../aplicacion/seguridad/rolesUseCase.js";

const obtenerRoles = async (req, res) => {
  try {
    const roles = await rolesUseCase.obtenerRolesService();
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

export default {
    obtenerRoles,
    obtenerRol,
    crearRol,
    actualizarRol
};
