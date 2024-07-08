import { TicketUsuario } from '../../models/incidencias/ticket_usuario.model.js';
import { Op } from 'sequelize';

const obtenerTicketsUsuarioRepository = async () => {
    try {
        const tickets = await TicketUsuario.findAll({ raw: true });
        return tickets;
    } catch (error) {
        console.log(error);
        return error.message;
    }
};

export default {
    obtenerTicketsUsuarioRepository,
};