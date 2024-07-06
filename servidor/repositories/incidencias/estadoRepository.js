import { Estado } from "../../models/incidencias/estado.model.js";
import { Op } from "sequelize";

const crearEstadoRepository = async (data) => {
  try {
    const dataCreate = await Estado.create(data);
    return dataCreate;
  } catch (error) {
    console.log(error);
    return error.message;
  }
};

const obtenerAllEstadosRepository = async () => {
  try {
    const data = await Estado.findAll({
      where: {
        str_estado_estado: "ACTIVO",
      },
    });
    return data;
  } catch (error) {
    console.log(error);
    return error.message;
  }
};

const obtenerEstadoByIdRepository = async (id) => {
  try {
    const data = await Estado.findOne({
      where: {
        int_estado_id: id,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
    return error.message;
  }
};

const actualizarEstadoRepository = async (id, data) => {
  try {
    const dataUpdate = await Estado.update({
      str_estado_nombre: data.nombre,
      dt_fecha_actualizacion: new Date(),
    
    }, {
      where: {
        int_estado_id: id,
      },
    });
    return dataUpdate;
  } catch (error) {
    console.log(error);
    return error.message;
  }
};

const cambiarEstadoRepository = async (id, data) => {
  try {
    const dataUpdate = await Estado.update({
      dt_fecha_actualizacion: new Date(),
      str_estado_estado: data.estado,
    
    }, {
      where: {
        int_estado_id: id,
      },
    });
    return dataUpdate;
  } catch (error) {
    console.log(error);
    return error.message;
  }
};

const buscarEstadoRepository = async (texto, page) => {
  try {
    const skip = (page - 1) * 10;
    //buscar por todos los campos con iLike
    const estados = await Estado.findAll({
      where: {
        [Op.or]: [
          {
            str_estado_nombre: {
              [Op.iLike]: `%${texto}%`,
            },
          },
        ],
      },
      order: [["dt_fecha_actualizacion", "DESC"]],
      offset: skip,
      limit: 10,
    });

    //obtener total de registros con el texto
    const totalEstados = await Estado.count({
      where: {
        [Op.or]: [
          {
            str_estado_nombre: {
              [Op.iLike]: `%${texto}%`,
            },
          },
        ],
      },
    });
    const data = {
      estados,
      totalEstados,
    };
    return data;
  } catch (error) {
    console.log(error);
    return error.message;
  }
};

const filtrarEstadoRepository = async (texto, page) => {
  try {
    const skip = (page - 1) * 10;
    //buscar por todos los campos con like
    const estados = await Estado.findAll({
      where: {
        [Op.or]: [
          {
            str_estado_estado: {
              [Op.like]: `${texto}`,
            },
          },
        ],
      },
      order: [["dt_fecha_actualizacion", "DESC"]],
      offset: skip,
      limit: 10,
    });



    //obtener total de registros con el texto

    const totalEstados = await Estado.count({
      where: {
        [Op.or]: [
          {
            str_estado_estado: {
              [Op.like]: `${texto}`,
            },
          },
        ],
      },
    });

    const data = {
      estados,
      totalEstados,
    };

    return data;

  } catch (error) {
    console.log(error);
    return error.message;
  }
};

const obtenerEstadosConPaginacionRepository = async (page, cantidad) => {
  try {
    const skip = (page - 1) * 10;
    const estados = await Estado.findAll({
      order: [["dt_fecha_actualizacion", "DESC"]],
      offset: skip,
      limit: cantidad,
    });

    return estados;
  } catch (error) {
    console.log(error);
    return error.message;
  }
};

const obtenerTotalEstadoRepository = async () => {
  try {
    const totalEstados = await Estado.count();
    return totalEstados;
  } catch (error) {
    console.log(error);
    return error.message;
  }
};
const obtenerEstadoPorNombreRepository = async (nombre) => {
  try {
    const estado = await Estado.findOne({
      where: {
        str_estado_nombre: nombre,
      },
    });
    return estado;
  } catch (error) {
    console.log(error);
    return error.message;
  }
};
export const obtenerEstadoByNombreRepository = async (nombre) => {
  try {
    const estado = await Estado.findOne({
      where: {
        str_estado_nombre: nombre,
      },
    });
    return estado;
  } catch (error) {
    console.log(error);
    return error.message;
  }
}



export default {
  crearEstadoRepository,
  obtenerAllEstadosRepository,
  obtenerEstadoByIdRepository,
  actualizarEstadoRepository,
  cambiarEstadoRepository,
  buscarEstadoRepository,
  filtrarEstadoRepository,
  obtenerEstadosConPaginacionRepository,
  obtenerTotalEstadoRepository,
  obtenerEstadoPorNombreRepository,
};
