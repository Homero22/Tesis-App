import ticketRepository from "../../repositories/incidencias/ticketRepository.js";

const crearTicketUseCase = async (data) => {
    try {
        const ticket = await ticketRepository.crearTicketRepository(data);
        return ticket;
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

export default {
    crearTicketUseCase,
    obtenerTicketsUseCase
}