import ticketUsuarioRepository from "../../repositories/incidencias/ticketUsuarioRepository.js";
import {
    paginacion,
    obtenerDataQueryPaginacion,
    validarPaginacion,
  } from "../utils/paginacion.utils.js";


export const crearTicketUsuarioUseCase = async (data) => {
    try {
        const ticketUsuario = await ticketUsuarioRepository.crearTicketUsuarioRepository(data);
        if(!ticketUsuario){
            return {
                status:false,
                message:"Error al crear el ticket usuario",
                body:[]
            };
        }
        return {
            status:true,
            message:"Ticket usuario creado correctamente",
            body:ticketUsuario
        }
    } catch (error) {
        console.log(error);
        return error.message;
    }
};

const obtenerTicketUsuariosUseCase = async () => {
    try {
        const ticketUsuarios = await ticketUsuarioRepository.obtenerAllTicketUsuariosRepository();
        return ticketUsuarios;
    } catch (error) {
        console.log(error);
        return error.message;
    }
};

const obtenerTicketUsuarioByIdUseCase = async (id) => {
    try {
        const ticketUsuario = await ticketUsuarioRepository.obtenerTicketUsuarioByIdRepository(id);
        return ticketUsuario;
    } catch (error) {
        console.log(error);
        return error.message;
    }
};

const actualizarTicketUsuarioUseCase = async (id, data) => {
    try {
        const ticketUsuario = await ticketUsuarioRepository.actualizarTicketUsuarioRepository(id, data);
        return ticketUsuario;
    } catch (error) {
        console.log(error);
        return error.message;
    }
};

const obtenerTicketUsuariosPaginacionUseCase = async (query) => {
    try {
        const { limit, offset } = obtenerDataQueryPaginacion(query);
        const ticketUsuarios = await ticketUsuarioRepository.obtenerAllTicketUsuariosRepository();
        const data = paginacion(ticketUsuarios, limit, offset);
        return data;
    } catch (error) {
        console.log(error);
        return error.message;
    }
};

export default {
    crearTicketUsuarioUseCase,
    obtenerTicketUsuariosUseCase,
    obtenerTicketUsuarioByIdUseCase,
    actualizarTicketUsuarioUseCase,
    obtenerTicketUsuariosPaginacionUseCase,
}