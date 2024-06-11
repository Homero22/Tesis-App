import ticketUseCase from "../../aplicacion/incidencias/ticketUseCase.js";

export const crearTicket = async (req, res) => {
    try {
        console.log("Crear Ticket");
        const data = req.body;
        const ticket = await ticketUseCase.crearTicketUseCase(data);
        res.json(ticket);
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
        console.log("Soluciones Ticket",id)
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
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: false,
            message: "Error al pasar el ticket " + error.message,
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
    pasarTicket
}

