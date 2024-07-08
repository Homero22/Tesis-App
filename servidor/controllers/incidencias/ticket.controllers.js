import ticketUseCase from "../../aplicacion/incidencias/ticketUseCase.js";
import { eventEmitter } from "../notificaciones/notificaciones.controller.js";
import {obtenerAdministradorService} from "../../aplicacion/usuarios/usuariosUseCase.js";
import notificacionesUsuarioUseCase from "../../aplicacion/incidencias/notificacionesUseCase.js"

export const crearTicket = async (req, res) => {
    try {
        const data = req.body;
        const ticket = await ticketUseCase.crearTicketUseCase(data);
        res.json(ticket);

        //notificacion de ticket creado
        eventEmitter.emit('notificacion', {
            tipo: 'success', 
            mensaje: "Se ha creado un nuevo ticket"
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: false, 
            message: "Error al crear el ticket " + error.message,
            body: [],
         });
    }
}

export const obtenerTickets = async (req, res) => {
    try {
        const tickets = await ticketUseCase.obtenerTicketsUseCase();
        res.json(tickets);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: false,
            message: "Error al obtener los tickets " + error.message,
            body: [],
          });
    }
}

export const obtenerTicketsConPaginacion = async (req, res) => {
    try {
        const query = req.query;
        const tickets = await ticketUseCase.obtenerTicketsConPaginacionUseCase(query);
        res.json(tickets);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: false,
            message: "Error al obtener los tickets con paginacion " + error.message,
            body: [],
          });
    }
}
export const editarTicket = async (req, res) => {
    try {
        const { id } = req.params;
        const {str_ticket_observacion} = req.body;
        const ticketU = await ticketUseCase.editarTicketUseCase(id,str_ticket_observacion);
        res.json(ticketU);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: false,
            message: "Error al editar el ticket " + error.message,
            body: [],
          });
    }
}

export const obtenerSolucionesTicketById = async (req, res) => {
    try {
        const { id } = req.params;
        const ticket = await ticketUseCase.obtenerSolucionesTicketByIdUseCase(id);
        res.json(ticket);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: false,
            message: "Error al obtener las soluciones del ticket " + error.message,
            body: [],
          });
    }
}

export const pasarTicket = async (req, res) => {
    try {
        const { id } = req.params;
        const {int_usuario_id, int_ticket_usuario_id} = req.body;
        const ticketU = await ticketUseCase.pasarTicketUseCase(id,int_usuario_id,int_ticket_usuario_id);
        res.json(ticketU);
        
        if(ticketU.status){
            eventEmitter.emit('notificacion', {
                tipo: 'success', 
                mensaje: "Se le ha pasado un ticket, revisar su bandeja de entrada",
                int_usuario_id: int_usuario_id
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: false,
            message: "Error al pasar el ticket " + error.message,
            body: [],
          });
    }
}

const reporteTickets = async (req, res) => {
    try {
        const {fechainicio,fechafin,estado} = req.query;
        const tickets = await ticketUseCase.reporteTicketsUseCase(fechainicio,fechafin,estado);
        res.json(tickets);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: false,
            message: "Error al obtener el reporte de tickets " + error.message,
            body: [],
          });
    }
}

const finalizarTicket = async (req, res) => {
    try {
        const { id } = req.params;
        const ticket = await ticketUseCase.finalizarTicketUseCase(id);
        res.json(ticket);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: false,
            message: "Error al finalizar el ticket " + error.message,
            body: [],
          });
    }
}
const enviarRevision = async (req, res) => {
    try {
        const { id } = req.params;
        //obtengo el id del administrador
        const administradores = await obtenerAdministradorService();
        for (let i = 0; i < administradores.length; i++) {
            
            const administrador = administradores[i];
            const notificacion = {
                int_usuario_id: administrador.int_usuario_id,
                str_notificacion_descripcion: "Se ha enviado a revisión el Ticket con ID: " + id,
                str_notificacion_titulo: "Revisar Ticket",
                dt_fecha_creacion: new Date()
              }
              const notificacionCreada = await notificacionesUsuarioUseCase.crearNotificacionUseCase(notificacion);
            eventEmitter.emit('notificacion', {
                tipo: 'success', 
                mensaje: "Se ha enviado a revisión el ticket con id " + id,
                int_usuario_id: administrador.int_usuario_id
            });
            
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: false,
            message: "Error al enviar a revision el ticket " + error.message,
            body: [],
          });
    }
}
export default {
    crearTicket,
    obtenerTickets,
    obtenerTicketsConPaginacion,
    editarTicket,
    obtenerSolucionesTicketById,
    pasarTicket,
    reporteTickets,
    finalizarTicket,
    enviarRevision
}

