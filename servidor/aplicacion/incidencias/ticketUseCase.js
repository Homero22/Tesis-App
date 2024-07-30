import ticketRepository from "../../repositories/incidencias/ticketRepository.js";
import ticketUsuarioRepository from "../../repositories/incidencias/ticketUsuarioRepository.js";
import { crearTicketUsuarioUseCase } from "./ticket_usuarioUseCase.js";
import {
  paginacion,
  obtenerDataQueryPaginacion,
  validarPaginacion,
} from "../utils/paginacion.utils.js";

import notificacionesUsuarioUseCase from "./notificacionesUseCase.js"

import { eventEmitter } from "../../controllers/notificaciones/notificaciones.controller.js";

import {obtenerEstadoByNombreRepository} from '../../repositories/incidencias/estadoRepository.js'

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
      int_usuario_id: data.str_ticket_usuario.int_usuario_id,
    };
    const ticketUsuario = await crearTicketUsuarioUseCase(ticketUsuarioObj);
    if (!ticketUsuario) {
      return {
        status: false,
        message: "Error al crear el ticket usuario",
        body: [],
      };
    }
    //notificacion de ticket creado
    const notificacion = {
      int_usuario_id: data.str_ticket_usuario.int_usuario_id,
      str_notificacion_descripcion: "Se le ha asignado un nuevo ticket",
      str_notificacion_titulo: "Nuevo ticket creado",
      dt_fecha_creacion: new Date()
    }

    const notificacionCreada = await notificacionesUsuarioUseCase.crearNotificacionUseCase(notificacion);

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
        ticket_usuario:
          ticket.dataValues.usuario.nombres +
          " " +
          ticket.dataValues.usuario.apellidos,
      };
      ticketsFormateado.push(ticketFormateado);
    }
    const metadata = paginacion(page, limit, totalRegistros);
    return {
      status: true,
      message: "Tickets encontrados",
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

const editarTicketUseCase = async (id, ticket) => {
  try {
    let ticketObj = {
      str_ticket_observacion: ticket,
    };

    const ticketEditado = await ticketRepository.editarTicketRepository(
      id,
      ticketObj
    );
    if (!ticketEditado) {
      return {
        status: false,
        message: "Error al editar el ticket",
        body: [],
      };
    }
    return {
      status: true,
      message: "Ticket editado correctamente",
      body: ticketEditado,
    };
  } catch (error) {
    console.log(error);
    return error.message;
  }
};
const obtenerSolucionesTicketByIdUseCase = async (id) => {
  try {
    const ticket = await ticketRepository.obtenerSolucionesTicketByIdRepository(
      id
    );

    if (!ticket) {
      return {
        status: false,
        message: "No se encontro el ticket",
        body: [],
      };
    }

    let ticketFormateado = [];

    for (let i = 0; i < ticket.length; i++) {
      const ticketA = ticket[i];
      const ticketUsuario = ticketA.dataValues.tb_usuario.dataValues;
      const ticketUsuarioFormateado = {
        txt_ticket_usuario_solucion:
          ticketA.dataValues.txt_ticket_usuario_solucion,
        usuario:
          ticketUsuario.str_usuario_nombres +
          " " +
          ticketUsuario.str_usuario_apellidos,
      };
      ticketFormateado.push(ticketUsuarioFormateado);
    }
    console.log("Ticket formateado", ticketFormateado);
    return {
      status: true,
      message: "Soluciones encontradas",
      body: ticketFormateado,
    };
  } catch (error) {
    console.log(error);
    return error.message;
  }
};

const pasarTicketUseCase = async (id, usuarioId, ticketUsuarioId) => {
  try {
    //id es el id del ticket
    //usuarioId es el id del usuario al que se le va a pasar el ticket

    let estado = "PENDIENTE";

    //comprobar que el ticket no se pase al mismo usuario, comprobando que el id del usuario sea diferente al id del usuario actual

    const ticket = await ticketRepository.comprobarTicketRepository(
      id,
      usuarioId
    );
    if (!ticket || ticket.str_ticket_usuario_estado == "PASADO") {

      //no hay registros entonces si puede crear y pasar el ticket
      const ticketUsuarioObj = {
        int_ticket_id: id,
        int_usuario_id: usuarioId,
        str_ticket_usuario_estado: estado,
      };
      const ticketUsuario = await ticketUsuarioRepository.crearTicketUsuarioRepository(
        ticketUsuarioObj
      );
      //actualizar el estado del ticket con el id del ticket_usuario
      const ticketUsuarioUpdate = await ticketRepository.cambiarEstadoTicketRepository(
        ticketUsuarioId,
        "PASADO"
      );
      //notificacion de ticket pasado
      const notificacion = {
        int_usuario_id: usuarioId,
        str_notificacion_descripcion: "Se le ha pasado un ticket",
        str_notificacion_titulo: "Ticket pasado",
        dt_fecha_creacion: new Date()
      }
      const notificacionCreada = await notificacionesUsuarioUseCase.crearNotificacionUseCase(notificacion);
      return {
        status: true,
        message: "Ticket pasado correctamente",
        body: ticketUsuario,
      };
    }
    if (
      ticket.str_ticket_usuario_estado == "PENDIENTE" &&
      ticket.int_usuario_id == usuarioId
    ) {
      return {
        status: false,
        message: "El ticket ya se encuentra asignado a este usuario",
        body: [],
      };
    }
  } catch (error) {
    console.log(error);
    return error.message;
  }
};

const reporteTicketsUseCase = async (fechaInicio, fechaFin, estado) => {
  try {
    let ticketsFormateado = [];
    //convierto las fechas a formato date
    const fechaInicioDate = new Date(fechaInicio);
    const fechaFinDate = new Date(fechaFin);
    let estadoNombre;

    //si el estado es "Tickets no atendidos" entonces el estado es "PENDIENTE"
    if (estado == "Tickets no atendidos") {
      console.log("CONDICION: Tickets no atendidos");
       //significa que aun no se ha registrado una solucion por parte del usuario responsable
       //obtengo todos los tickets que tienen un registro en la tabla ticket_usuario y que este no tenga una solucion dada
       const ticketsNoAtendidos = await ticketRepository.reporteTicketsNoAtendidosRepository(fechaInicioDate,fechaFinDate);
        if(ticketsNoAtendidos.length == 0){
          return {
            status: false,
            message: "No se encontraron tickets en este rango de fechas",
            body: [],
          };
        }
        formatearTicket(ticketsNoAtendidos);
        return {
          status: true,
          message: "Tickets encontrados",
          body: ticketsFormateado,
        };
    }
    //si el estado es "Tickets finalizados" entonces el estado es "FINALIZADO"
    if (estado == "Tickets finalizados") {
      console.log("CONDICION: Tickets finalizados");
      estadoNombre = "Finalizado";
      const estadoId = await obtenerEstadoByNombreRepository(estadoNombre);
      const tickets = await ticketRepository.reporteTicketsRepository(
        fechaInicioDate,
        fechaFinDate,
        estadoId.int_estado_id
      );
      //console.log("Tickets",tickets);
      if(tickets.length == 0){
        return {
          status: false,
          message: "No se encontraron tickets en este rango de fechas",
          body: [],
        };
      }
      formatearTicket(tickets);
      return {
        status: true,
        message: "Tickets encontrados",
        body: ticketsFormateado,
      };

    }
    //si el estado es "Tickets resueltos" entonces el estado es "RESUELTO"
    if (estado == "Tickets resueltos") {
      console.log("CONDICION: Tickets resueltos");
      const ticketsResueltos = await ticketRepository.reporteTicketsResueltosRepository(fechaInicioDate,fechaFinDate);
      if(ticketsResueltos.length == 0){
        return {
          status: false,
          message: "No se encontraron tickets en este rango de fechas",
          body: [],
        };
      }
      formatearTicket(ticketsResueltos);
      console.log("Tickets formateados",ticketsFormateado);
      return {
        status: true,
        message: "Tickets encontrados",
        body: ticketsFormateado,
      };

    }

   

   

    function formatearTicket(tickets){
      console.log("Funcion formatearTicket")
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
          ticket_usuario:
            ticket.dataValues.usuario.nombres +
            " " +
            ticket.dataValues.usuario.apellidos,
        };
        ticketsFormateado.push(ticketFormateado);
      }

    }
    
  } catch (error) {
    console.log(error);
    return error.message;
  }
};



const finalizarTicketUseCase = async (id) => {
  try {
    const ticket = await ticketRepository.finalizarTicketRepository(id);
    console.log("Ticket", ticket);
    if (!ticket) {
      return {
        status: false,
        message: "Error al finalizar el ticket",
        body: [],
      };
    }
    return {
      status: true,
      message: "Ticket finalizado correctamente",
      body: ticket,
    };
  } catch (error) {
    console.log(error);
    return error.message;
  }
};

const buscarTicketsUseCase = async (id) => {

  const {tickets, totalTickets} = await ticketRepository.buscarTicketsRepository(id);
  if(tickets.length > 0){
    let ticketsFormateado = [];

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
        ticket_usuario:
          ticket.dataValues.usuario.nombres +
          " " +
          ticket.dataValues.usuario.apellidos,
      };
      ticketsFormateado.push(ticketFormateado);
    }



    return {
      status: true,
      message: "Tickets encontrados",
      body: ticketsFormateado,
      metadata: {
        pagination: {
          previousPage: 0,
          currentPage: 1,
          nextPage: null,
          total: totalTickets,
          limit: totalTickets,
        }
      },
    };
  }else{
    return{
      status: false,
      message: "No se encontraron tickets",
      body: [],
      metadata: {
        pagination:{
          previousPage: 0,
          currentPage: 1,
          nextPage: null,
          total: tickets.length,
          limit: tickets.length,
        }
      }
    }
  }
}

const filtrarTicketsUseCase = async (filtro, page) => {
  //convierto page en numero
  page = parseInt(page);
  const {tickets, totalTickets} = await ticketRepository.filtrarTicketsRepository(filtro, page);

  if(tickets.length > 0){
    let ticketsFormateado = [];
    
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
        ticket_usuario:
          ticket.dataValues.usuario.nombres +
          " " +
          ticket.dataValues.usuario.apellidos,
      };
      ticketsFormateado.push(ticketFormateado);
    }

    const metadata = paginacion(page, 10, totalTickets);
    return {
      status: true,
      message: "Tickets encontrados",
      body: ticketsFormateado,
      metadata: {
        pagination: metadata,
      },
    };
  }else{
    return{
      status: false,
      message: "No se encontraron tickets",
      body: [],
      metadata: {
        pagination:{
          previousPage: 0,
          currentPage: 1,
          nextPage: null,
          total: tickets.length,
          limit: tickets.length,
        }
      }
    }
  }
} 
  

export default {
  crearTicketUseCase,
  obtenerTicketsUseCase,
  obtenerTicketsConPaginacionUseCase,
  editarTicketUseCase,
  obtenerSolucionesTicketByIdUseCase,
  pasarTicketUseCase,
  reporteTicketsUseCase,
  finalizarTicketUseCase,
  buscarTicketsUseCase,
  filtrarTicketsUseCase
};
