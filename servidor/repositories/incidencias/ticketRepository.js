import { Ticket } from "../../models/incidencias/ticket.model.js";
import { TicketUsuario } from "../../models/incidencias/ticket_usuario.model.js";
import { Usuario } from "../../models/seguridad/usuario.model.js";
import { Servicio } from "../../models/incidencias/servicio.model.js";
import { Estado } from "../../models/incidencias/estado.model.js";
import { Vulnerabilidades } from "../../models/incidencias/vulnerabilidades.model.js";
import { Op } from "sequelize";

const crearTicketRepository = async (data) => {
    try {
        const dataCreate = await Ticket.create({
            int_servicio_id: data.int_servicio_id,
            int_estado_id: data.int_estado_id,
            int_vulnerabilidades_id: data.int_vulnerabilidades_id,
            str_ticket_observacion: data.str_ticket_observacion
        });
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

const obtenerTicketsConPaginacionRepository = async (page, limit) => {
    try {
        const skip = (page - 1) * 10;

        //TICKET es una tabla hija de SERVICIO, ESTADO y VULNERABILIDADES por lo que se debe hacer un JOIN para obtener los datos de las tablas padre
        //ademas TICKET es tabla padre de ticket_usuario por lo que necesitamos saber que usuario tiene asignado el ticket

        const tickets = await Ticket.findAll({
            include: [
                {
                    model: Servicio,
                    required: true
                },
                {
                    model: Estado,
                    required: true
                },
                {
                    model: Vulnerabilidades,
                    required: true
                }
            ],
            order: [
                ['dt_fecha_actualizacion', 'DESC']
            ],
            offset: skip,
            limit: limit
        });
        //como ticket tiene una relacion con ticket_usuario, necesitamos obtener los usuarios que tienen asignado un ticket
        for (let i = 0; i < tickets.length; i++) {
            const ticket = tickets[i];
            const ticket_usuario = await TicketUsuario.findAll({
                where: {
                    int_ticket_id: ticket.int_ticket_id
                },
                include: [
                    {
                        model: Usuario,
                        required: true
                    }
                ]
            });
            ticket.dataValues.ticket_usuario = ticket_usuario;
        }

        return tickets;

    } catch (error) {
        console.log(error);
        return error.message;
    }
}

const obtenerTotalTicketsRepository = async () => {
    try {
        const totalTickets = await Ticket.count();
        return totalTickets;
    } catch (error) {
        console.log(error);
        return error.message;
    }
}

const verificarTicketExistenteRepository = async (data) => {
    try {
        //verificar por servicio, estado, id_vulnerabilidad
        const ticket = await Ticket.findOne({
            where: {
                int_servicio_id: data.int_servicio_id,
                int_estado_id: data.int_estado_id,
                int_vulnerabilidades_id: data.int_vulnerabilidades_id
            }
        });

        return ticket;

    } catch (error) {
        console.log(error);
        return error.message;
    }
}



export default {
    crearTicketRepository,
    obtenerAllTicketsRepository,
    obtenerTicketsConPaginacionRepository,
    obtenerTotalTicketsRepository,
    verificarTicketExistenteRepository
}


