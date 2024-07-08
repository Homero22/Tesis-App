import { HistorialVulnerabilidades } from "../../models/incidencias/historial_vulnerabilidades.model.js";
import { Op } from "sequelize";

const obtenerAllVulnerabilidadesRepository = async () => {
  try {
    const vulnerabilidades = await HistorialVulnerabilidades.findAll({
      raw: true,
    });
    return vulnerabilidades;
  } catch (error) {
    console.log(error);
    return error.message;
  }
};

export default {
  obtenerAllVulnerabilidadesRepository,
};
