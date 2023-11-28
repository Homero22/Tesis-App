import permisosUseCase from "../../aplicacion/seguridad/permisosUseCase.js";

const obtenerPermisosPorIdUsuarioRol = async (req, res) => {
  try {
    const { id } = req.params;
    const permisos = await permisosUseCase.obtenerPermisosPorIdUsuarioRolService(
      id
    );
    res.json(permisos);
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Error en el servidor" + error,
      body: [],
    });
  }
};

const actualizarPermisosPorIdUsuarioRol = async (req, res) => {
    try {
        const { id } = req.params;
        const {permisos} = req.body;
        const permisosActualizados = await permisosUseCase.actualizarPermisosPorIdUsuarioRolService(
        id,
        permisos
        );
        res.json(permisosActualizados);
    } catch (error) {
        res.status(500).json({
        status: false,
        message: "Error en el servidor" + error,
        body: [],
        });
    }
};

export default {
    obtenerPermisosPorIdUsuarioRol,
    actualizarPermisosPorIdUsuarioRol,
};