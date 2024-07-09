import { Servicio } from "../../models/incidencias/servicio.model.js";
import { Op } from "sequelize";

const crearServicioRepository = async (data) => {
  try {
    const dataCreate = await Servicio.create(data);
    return dataCreate;
  } catch (error) {
    console.log(error);
    return error.message;
  }
};

const obtenerAllServiciosRepository = async () => {
  try {
    //obtener servicios activos
    const data = await Servicio.findAll({
      where: {
        str_servicio_estado: "ACTIVO",
      },
    });
    return data;
  } catch (error) {
    console.log(error);
    return error.message;
  }
};

const obtenerServicioByIdRepository = async (id) => {
  try {
    const data = await Servicio.findOne({
      where: {
        int_servicio_id: id,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
    return error.message;
  }
};

const actualizarServicioRepository = async (id, data) => {
  try {
   
    const dataUpdate = await Servicio.update({
      str_servicio_nombre: data.nombre,
      dt_fecha_actualizacion: new Date(),
    }, {
      where: {
        int_servicio_id: id,
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
    
    const dataUpdate = await Servicio.update(
      {
        str_servicio_estado: data.str_servicio_estado,
        dt_fecha_actualizacion: new Date(),
      },
      {
        where: {
          int_servicio_id: id,
        },
      }
    );
    return dataUpdate;
  } catch (error) {
    console.log(error);
    return error.message;
  }
};

const buscarServicioRepository = async (texto, page) => {
  try {
    const skip = (page - 1) * 10;
    //buscar por todos los campos con iLike
    const servicios = await Servicio.findAll({
      where: {
        [Op.or]: [
          {
            str_servicio_nombre: {
              [Op.iLike]: `%${texto}%`,
            },
          },
        ],
      },
      order: [["dt_fecha_actualizacion", "DESC"]],
      offset: skip,
      limit: 10,
    });

    //obtener la cantidad de registros con el texto
    const totalServicios = await Servicio.count({
      where: {
        [Op.or]: [
          {
            str_servicio_nombre: {
              [Op.iLike]: `%${texto}%`,
            },
          },
        ],
      },
    });

    const data = {
      servicios,
      totalServicios,
    };

    return data;
  } catch (error) {
    console.log(error);
    return error.message;
  }
};

const filtrarServicioRepository = async (texto, page) => {
  try {
    const skip = (page - 1) * 10;
    //buscar por todos los campos con Like
    const servicios = await Servicio.findAll({
      where: {
        [Op.or]: [
          {
            str_servicio_estado: {
              [Op.like]: `${texto}`,
            },
          },
        ],
      },
      order: [["dt_fecha_actualizacion", "DESC"]],
      offset: skip,
      limit: 10,
    });

    //obtener la cantidad de registros con el texto
    const totalServicios = await Servicio.count({
      where: {
        [Op.or]: [
          {
            str_servicio_estado: {
              [Op.like]: `${texto}`,
            },
          },
        ],
      },
    });

    const data = {
      servicios,
      totalServicios,
    };

    return data;
  } catch (error) {
    console.log(error);
    return error.message;
  }
};

const obtenerServicioConPaginacionRepository = async (page, cantidad) => {
  try {
    const skip = (page - 1) * 10;
    const data = await Servicio.findAll({
      order: [["dt_fecha_actualizacion", "DESC"]],
      offset: skip,
      limit: cantidad,
    });
    return data;
  } catch (error) {
    console.log(error);
    return error.message;
  }
};

const obtenerTotalServiciosRepository = async () => {
  try {
    const data = await Servicio.count();
    return data;
  } catch (error) {
    console.log(error);
    return error.message;
  }
};

const obtenerServicioPorNombreRepository = async (nombre) => {
  console.log;
  try {
    const data = await Servicio.findOne({
      where: {
        str_servicio_nombre: nombre,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
    return error.message;
  }
};

export default {
  crearServicioRepository,
  obtenerAllServiciosRepository,
  obtenerServicioByIdRepository,
  actualizarServicioRepository,
  cambiarEstadoRepository,
  buscarServicioRepository,
  filtrarServicioRepository,
  obtenerServicioConPaginacionRepository,
  obtenerTotalServiciosRepository,
  obtenerServicioPorNombreRepository,
};
