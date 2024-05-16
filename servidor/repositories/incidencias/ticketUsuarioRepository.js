
import {TicketUsuario} from "../../models/incidencias/ticket_usuario.model.js";
import { Op } from "sequelize";

const crearTicketUsuarioRepository = async (data) => {
  try {
    const dataCreate = await TicketUsuario.create(data);
    return dataCreate;
  } catch (error) {
    console.log(error);
    return error.message;
  }
};

const obtenerAllTicketUsuariosRepository = async () => {
    try {
        const data = await TicketUsuario.findAll({
        where: {
            str_ticket_usuario_estado: "ACTIVO",
        },
        });
        return data;
    } catch (error) {
        console.log(error);
        return error.message;
    }
    };

const obtenerTicketUsuarioByIdRepository = async (id) => {
    try {
        const data = await TicketUsuario.findOne({
        where: {
            int_ticket_usuario_id: id,
        },
        });
        return data;
    } catch (error) {
        console.log(error);
        return error.message;
    }
    };

const actualizarTicketUsuarioRepository = async (id, data) => {
    try {
        const dataUpdate = await TicketUsuario.update({
        str_ticket_usuario_nombre: data.nombre,
        dt_fecha_actualizacion: new Date(),
        }, {
        where: {
            int_ticket_usuario_id: id,
        },
        });
        return dataUpdate;
    } catch (error) {
        console.log(error);
        return error.message;
    }
};

export default {
    crearTicketUsuarioRepository,
    obtenerAllTicketUsuariosRepository,
    obtenerTicketUsuarioByIdRepository,
    actualizarTicketUsuarioRepository
}