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
export const agregarSolucionTicketUsuarioUseCase = async (data) => {
    try {
        const ticketUsuario = await ticketUsuarioRepository.agregarSolucionTicketUsuarioRepository(data);
        if(!ticketUsuario){
            return {
                status:false,
                message:"Error al agregar la solucion al ticket usuario",
                body:[]
            };
        }
        return {
            status:true,
            message:"Solucion agregada correctamente",
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

const obtenerTicketUsuariosPaginacionUseCase = async (query,usuario) => {
    const validacion = validarPaginacion(query);
    if (validacion != true) {
      return validacion;
    }
    let idUsuario = usuario.body.int_usuario_id;
    const { page, limit } = obtenerDataQueryPaginacion(query);
    let ticketUsuarios = await ticketUsuarioRepository.obtenerTicketUsuariosConPaginacionRepository(
      page,
      limit,
        idUsuario
    );


    const totalTicketUsuarios = await ticketUsuarioRepository.obtenerTotalTicketUsuariosRepository(idUsuario);

    const metadata = paginacion(page, limit, totalTicketUsuarios);

    
    console.log("ticketUsuarios",ticketUsuarios);

    return {
      status: true,
      message: "Ticket usuarios encontrados",
      body: ticketUsuarios,
      metadata: {
        pagination: metadata,
      }
    };






};

export default {
    crearTicketUsuarioUseCase,
    obtenerTicketUsuariosUseCase,
    obtenerTicketUsuarioByIdUseCase,
    actualizarTicketUsuarioUseCase,
    obtenerTicketUsuariosPaginacionUseCase,
    agregarSolucionTicketUsuarioUseCase
}