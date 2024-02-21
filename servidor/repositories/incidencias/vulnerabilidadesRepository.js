import { Vulnerabilidades } from "../../models/incidencias/vulnerabilidades.model.js";
import { Op } from "sequelize";


const importarVulnerabilidadesRepository = async (data) => {
  try {
    const dataCreate = await Vulnerabilidades.bulkCreate(data);
    return dataCreate;
  } catch (error) {
    console.log(error);
    return error.message;
  }
};
const obtenerAllVulnerabilidadesRepository = async () => {
  try {
    const vulnerabilidades = await Vulnerabilidades.findAll({raw:true});
    return vulnerabilidades;
  } catch (error) {
    console.log(error);
    return error.message;
  }
};
const obtenerVulnerabilidadesPaginationRepository = async (page, cantidad) => {
  try {
    const skip = (page - 1) * cantidad;
    const vulnerabilidades = await Vulnerabilidades.findAll({
        offset: skip,
        limit: cantidad,
        order:[
            ['dt_fecha_actualizacion','DESC']
        ]
    });
    return vulnerabilidades;
  } catch (error) {
    console.log(error);
    return error.message;
  }
};
const obtenerTotalVulnerabilidadesRepository = async () => {
  try {
    const totalVulnerabilidades = await Vulnerabilidades.count();
    return totalVulnerabilidades;
  } catch (error) {
    console.log(error);
    return error.message;
  }
};

export default {
  importarVulnerabilidadesRepository,
  obtenerVulnerabilidadesPaginationRepository,
  obtenerTotalVulnerabilidadesRepository,
  obtenerAllVulnerabilidadesRepository
};
