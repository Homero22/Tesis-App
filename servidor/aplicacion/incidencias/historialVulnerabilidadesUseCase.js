import historialVulnerabilidadesRepository from "../../repositories/incidencias/historialVulnerabilidadesRepository.js";

const obtenerAllVulnerabilidadesService = async () => {
  try {
    const vulnerabilidades = await historialVulnerabilidadesRepository.obtenerAllVulnerabilidadesRepository();
    return vulnerabilidades;
  } catch (error) {
    console.log(error);
    return error.message;
  }
}

export default {
    obtenerAllVulnerabilidadesService,
};