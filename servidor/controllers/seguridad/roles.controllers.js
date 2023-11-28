import rolesUseCase from "../../aplicacion/seguridad/rolesUseCase.js";

const obtenerRoles = async (req, res) => {
  try {
    const roles = await rolesUseCase.obtenerRolesService();
    console.log(roles);
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


export default {
    obtenerRoles,
    obtenerRol
};
