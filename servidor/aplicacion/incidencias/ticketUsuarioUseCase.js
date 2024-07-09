import ticketUsuarioRepository from "../../repositories/incidencias/ticketUsuarioRepository.js";

const obtenerTicketsUsuarioService = async () => {
    try {
        const tickets = await ticketUsuarioRepository.obtenerTicketsUsuarioRepository();
        return tickets;
    } catch (error) {
        console.log(error);
        return error.message;
    }
}

export default {
    obtenerTicketsUsuarioService,
};