import { Archivo } from "../../models/incidencias/archivo.model.js";
import { Op } from "sequelize";

const crearArchivoRepository = async (data) => {
  try {
    const dataCreate = await Archivo.create(data);
    return dataCreate;
  } catch (error) {
    console.log(error);
    return error.message;
  }
};

const obtenerArchivoByNameRepository = async (nombre) => {
  try {
    const data = await Archivo.findOne({
      where: {
        str_archivo_nombre: {
          [Op.eq]: nombre,
        },
      },
    });
    return data;
  } catch (error) {
    console.log(error);
    return error.message;
  }
};

export default {
  crearArchivoRepository,
  obtenerArchivoByNameRepository,
};
