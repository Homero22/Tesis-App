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
        //console.log("Todos los tickets tickets", tickets);
        //como ticket tiene una relacion con ticket_usuario, necesitamos obtener el usuario actual que tiene asignado un ticket
        for (let i = 0; i < tickets.length; i++) {
            const ticket = tickets[i];
            const ticket_usuario = await TicketUsuario.findOne({
                where: {
                    int_ticket_id: ticket.int_ticket_id,
                    str_ticket_usuario_estado: 'PENDIENTE'
                },
                include: [
                    {
                        model: Usuario,
                        required: true
                    }
                ],
            });

            let nombres = ticket_usuario.dataValues.tb_usuario.str_usuario_nombres;
            let apellidos = ticket_usuario.dataValues.tb_usuario.str_usuario_apellidos;

            ticket.dataValues.usuario ={
                nombres: nombres,
                apellidos: apellidos
            }

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

const editarTicketRepository = async (id,ticket) =>{
    try {
        console.log("idRepo",id);
        console.log("ticket",ticket);

       const ticketEdit = await Ticket.update(ticket,{
           where:{
               int_ticket_id: id
           }
         });
         
        return ticketEdit;
    } catch (error) {
        console.log(error);
        return error.message;
    }
}
const comprobarTicketRepository = async (idTicket, idUsuario) => {
    try {
        const ticket = await TicketUsuario.findOne({
            where: {
                int_ticket_id: idTicket,
                int_usuario_id: idUsuario
            }
        });
        console.log("ticket si encuentra1??",ticket);
        return ticket;
    } catch (error) {
        console.log(error);
        return error.message;
    }
}

const obtenerSolucionesTicketByIdRepository = async (id) => {
    try {
        const ticket = await TicketUsuario.findAll({
          include: [
            {
              model: Usuario,
              required: true
            }
          ],
            where: {
                int_ticket_id: id
            },
            
            order: [
                ['dt_fecha_actualizacion', 'DESC']
            ]
        });
        return ticket;
    } catch (error) {
        console.log(error);
        return error.message;
    }
}

const pasarTicketRepository = async (idTicket, idUsuario, estado) => {
    try {
        const ticketEdit = await TicketUsuario.create({
            int_ticket_id: idTicket,
            int_usuario_id: idUsuario,
            int_estado_id: estado
        });
        return ticketEdit;
    } catch (error) {
        console.log(error);
        return error.message;
    }
}
// const cambiarEstadoTicketRepository = async (ticketUsuarioId, estado) => {
//     try {
//         console.log("Aqui debe cambiar el estado del ticket usuario", ticketUsuarioId, estado)
//         const ticketEdit = await TicketUsuario.update({
//             str_ticket_usuario_estado: estado,
//             dt_fecha_actualizacion: new Date()
//         },{
//             where:{
//                 int_ticket_usuario_id: ticketUsuarioId
//             }
//         });
//         return ticketEdit;
//     } catch (error) {
//         console.log(error);
//         return error.message;
//     }
// }

const cambiarEstadoTicketRepository = async (idTicketUsuario, estado) => {
    try {
        //actualizo
        const ticketEdit = await TicketUsuario.update({
            str_ticket_usuario_estado: estado,
            dt_fecha_actualizacion: new Date()
        },{
            where:{
                int_ticket_usuario_id: idTicketUsuario
            
            }
        });
    } catch (error) {
        console.log(error);
        return error.message;
    }
}

const obtenerSeguimientoByTicketIdRepository = async (id) => {
    try {
        const seguimiento = await TicketUsuario.findAll({
            where: {
                int_ticket_id: id
            },
            include: [
                {
                    model: Usuario,
                    required: true
                }
            ],
            order: [
                ['dt_fecha_actualizacion', 'DESC']
            ]
        });
        return seguimiento;
    } catch (error) {
        console.log(error);
        return error.message;
    }
}

const obtenerTicketByIdRepository = async (id) => {
    try {
        const ticket = await Ticket.findOne({
            where: {
                int_ticket_id: id
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
    verificarTicketExistenteRepository,
    editarTicketRepository,
    obtenerSolucionesTicketByIdRepository,
    pasarTicketRepository,
    comprobarTicketRepository,
    cambiarEstadoTicketRepository,
    obtenerSeguimientoByTicketIdRepository,
    obtenerTicketByIdRepository
}


