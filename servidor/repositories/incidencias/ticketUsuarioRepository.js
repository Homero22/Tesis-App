
import {TicketUsuario} from "../../models/incidencias/ticket_usuario.model.js";
import { Ticket } from "../../models/incidencias/ticket.model.js";
import { Estado } from "../../models/incidencias/estado.model.js";
import { Vulnerabilidades } from "../../models/incidencias/vulnerabilidades.model.js";
import { Op } from "sequelize";
import { Servicio } from "../../models/incidencias/servicio.model.js";

const crearTicketUsuarioRepository = async (data) => {
  try {
    const dataCreate = await TicketUsuario.create(data);
    return dataCreate;
  } catch (error) {
    console.log(error);
    return error.message;
  }
};

const obtenerAllTicketUsuariosRepository = async () => {
    try {
        const data = await TicketUsuario.findAll({
        where: {
            str_ticket_usuario_estado: "ACTIVO",
        },
        });
        return data;
    } catch (error) {
        console.log(error);
        return error.message;
    }
    };

const obtenerTicketUsuarioByIdRepository = async (id) => {
    try {
        const data = await TicketUsuario.findOne({
        where: {
            int_ticket_usuario_id: id,
        },
        });
        return data;
    } catch (error) {
        console.log(error);
        return error.message;
    }
    };

const actualizarTicketUsuarioRepository = async (id, data) => {
    try {
        const dataUpdate = await TicketUsuario.update({
        str_ticket_usuario_nombre: data.nombre,
        dt_fecha_actualizacion: new Date(),
        }, {
        where: {
            int_ticket_usuario_id: id,
        },
        });
        return dataUpdate;
    } catch (error) {
        console.log(error);
        return error.message;
    }
};
const obtenerTotalTicketUsuariosRepository = async (idUsuario) => {
    try {
        const totalTicketUsuarios = await TicketUsuario.count({
            where: {
                int_usuario_id: idUsuario
            }
        });
        return totalTicketUsuarios;
    } catch (error) {
        console.log(error);
        return error.message;
    }
};

const obtenerTicketUsuariosConPaginacionRepository = async (page, limit,idUsuario) => {
    try {
        
        const skip = (page - 1) * 10;
        let ticketUsuarios = await TicketUsuario.findAll({
            offset: skip,
            limit: limit,
            order: [
                ['dt_fecha_actualizacion', 'DESC']
            ],
            where: {
                int_usuario_id: idUsuario
            },
            raw: true
        });
       


       
        for(let i = 0; i < ticketUsuarios.length; i++){
            const inf = ticketUsuarios[i]

            const ticketA = await Ticket.findAll({
                include:[
                    {
                        model: Servicio,
                        required:true
                    },
                    {
                        model:Estado,
                        required:true
                    },
                    {   
                        model:Vulnerabilidades,
                        required:true
                    }
                ],
                where:{
                    int_ticket_id:inf.int_ticket_id
                },
                raw:true,
                //quitar nombre de los modelos
                nest: true

            })
            //agrego el idUsuario
            ticketA[0].idUsuario = idUsuario
            ticketA[0].int_ticket_usuario_id = inf.int_ticket_usuario_id
            //estado del ticket_usuario
            ticketA[0].str_ticket_usuario_estado = inf.str_ticket_usuario_estado
            ticketUsuarios[i] = ticketA
           
           

        }


        return ticketUsuarios;
    } catch (error) {
        console.log(error);
        return error.message;
    }
};
export const agregarSolucionTicketUsuarioRepository = async (data) => {
    try {
        
        const dataUpdate = await TicketUsuario.update({
            txt_ticket_usuario_solucion: data.txt_ticket_usuario_solucion,
            dt_fecha_actualizacion: new Date()
        }, {
            where: {
                int_ticket_usuario_id:  data.int_ticket_usuario_id
            }
        });
        return dataUpdate;
    } catch (error) {
        console.log(error);
        return error.message;
    }
}
const cambiarEstadoTicketUsuarioRepository = async (id, estado) => {
    try {
        const dataUpdate = await TicketUsuario.update({
            str_ticket_usuario_estado: estado
        }, {
            where: {
                int_ticket_usuario_id: id
            }
        });
        return dataUpdate;
    } catch (error) {
        console.log(error);
        return error.message;
    }
}



export default {
    crearTicketUsuarioRepository,
    obtenerAllTicketUsuariosRepository,
    obtenerTicketUsuarioByIdRepository,
    actualizarTicketUsuarioRepository,
    obtenerTicketUsuariosConPaginacionRepository,
    obtenerTotalTicketUsuariosRepository,
    agregarSolucionTicketUsuarioRepository,
    cambiarEstadoTicketUsuarioRepository
}
