import { Ticket } from "../../models/incidencias/ticket.model.js";
import { Op } from "sequelize";

const crearTicketRepository = async (data) => {
    try {
        const dataCreate = await Ticket.create(data);
        return dataCreate;
    } catch (error) {
        console.log(error);
        return error.message;
    }
}

const obtenerAllTicketsRepository = async () => {
    try {
        const tickets = await Ticket.findAll({raw:true});
        return tickets;
    } catch (error) {
        console.log(error);
        return error.message;
    }
}



export default{
    crearTicketRepository,
    obtenerAllTicketsRepository
}


