import ticketUseCase from "../../aplicacion/incidencias/ticketUseCase.js";

export const crearTicket = async (req, res) => {
    try {
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

export default {
    crearTicket,
    obtenerTickets
}

