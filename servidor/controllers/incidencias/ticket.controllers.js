import ticketUseCase from "../../aplicacion/incidencias/ticketUseCase.js";
import { eventEmitter } from "../notificaciones/notificaciones.controller.js";

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
        console.log(req.query)
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
        console.log("controller")
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
        console.log("Respuest",ticketU.status);
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

export default {
    crearTicket,
    obtenerTickets,
    obtenerTicketsConPaginacion,
    editarTicket,
    obtenerSolucionesTicketById,
    pasarTicket,
    reporteTickets
}

