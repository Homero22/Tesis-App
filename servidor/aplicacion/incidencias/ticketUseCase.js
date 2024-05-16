import ticketRepository from "../../repositories/incidencias/ticketRepository.js";
import { crearTicketUsuarioUseCase } from "./ticket_usuarioUseCase.js";
import {
  paginacion,
  obtenerDataQueryPaginacion,
  validarPaginacion,
} from "../utils/paginacion.utils.js";
const crearTicketUseCase = async (data) => {
  try {
    //objeto
    let ticketObj = {
      int_servicio_id: data.int_servicio_id,
      int_vulnerabilidades_id: data.int_vulnerabilidades_id,
      int_estado_id: data.int_estado_id,
      str_ticket_observacion: data.str_ticket_observacion,
    };
    const ticketVerificar =
      await ticketRepository.verificarTicketExistenteRepository({
        int_servicio_id: data.int_servicio_id,
        int_vulnerabilidades_id: data.int_vulnerabilidades_id,
        int_estado_id: data.int_estado_id,
      });
    if (ticketVerificar) {
      return {
        status: false,
        message: "El ticket ya existe con los mismos datos",
        body: [],
      };
    }

    const ticket = await ticketRepository.crearTicketRepository(ticketObj);

    if (!ticket) {
      return {
        status: false,
        message: "Error al crear el ticket",
        body: [],
      };
    }
    //creo el usuario_ticket
    const ticketUsuarioObj = {
      int_ticket_id: ticket.int_ticket_id,
      int_usuario_id: data.str_ticket_usuario[0].int_usuario_id,
    };
    const ticketUsuario = await crearTicketUsuarioUseCase(ticketUsuarioObj);
    if (!ticketUsuario) {
      return {
        status: false,
        message: "Error al crear el ticket usuario",
        body: [],
      };
    }

    return {
      status: true,
      message: "Ticket creado correctamente",
      body: ticket,
    };
  } catch (error) {
    console.log(error);
    return error.message;
  }
};

const obtenerTicketsUseCase = async () => {
  try {
    const tickets = await ticketRepository.obtenerAllTicketsRepository();
    return tickets;
  } catch (error) {
    console.log(error);
    return error.message;
  }
};
const obtenerTicketsConPaginacionUseCase = async (query) => {
  const validacion = validarPaginacion(query);
  if (validacion != true) {
    return validacion;
  }
  const { page, limit } = obtenerDataQueryPaginacion(query);
  const tickets = await ticketRepository.obtenerTicketsConPaginacionRepository(
    page,
    limit
  );
  const totalRegistros = await ticketRepository.obtenerTotalTicketsRepository();
  //formatear la respuesta para obtener los datos de las tablas relacionadas
  let ticketsFormateado = [];
  


  if (tickets.length > 0) {

    for (let i = 0; i < tickets.length; i++) {
        const ticket = tickets[i];
        const ticketFormateado = {
          int_ticket_id: ticket.int_ticket_id,
          int_servicio_id: ticket.tb_servicio.int_servicio_id,
          str_servicio_nombre: ticket.tb_servicio.str_servicio_nombre,
          int_vulnerabilidades_id:
            ticket.tb_vulnerabilidade.int_vulnerabilidades_id,
          str_vulnerabilidades_nombre:
            ticket.tb_vulnerabilidade.str_vulnerabilidades_name,
          int_estado_id: ticket.tb_estado.int_estado_id,
          str_estado_nombre: ticket.tb_estado.str_estado_nombre,
          str_ticket_observacion: ticket.str_ticket_observacion,
          dt_fecha_creacion: ticket.dt_fecha_creacion,
          dt_fecha_actualizacion: ticket.dt_fecha_actualizacion,
          ticket_usuario: ticket.dataValues.ticket_usuario[0].tb_usuario.str_usuario_nombres + " " + ticket.dataValues.ticket_usuario[0].tb_usuario.str_usuario_apellidos,
        };
        ticketsFormateado.push(ticketFormateado);
      }
    const metadata = paginacion(page, limit, totalRegistros);
    return {
      status: false,
      message: "No se encontraron tickets",
      body: ticketsFormateado,
      metadata: {
        pagination: metadata,
      },
    };
  }
  return {
    status: false,
    message: "No se encontraron tickets",
    body: [],
  };
};

export default {
  crearTicketUseCase,
  obtenerTicketsUseCase,
  obtenerTicketsConPaginacionUseCase,
};
