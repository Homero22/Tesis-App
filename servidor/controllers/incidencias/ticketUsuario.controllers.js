import ticketUsuario from "../../aplicacion/incidencias/ticket_usuarioUseCase.js";
import { jwtVariables } from "../../configuracion/variablesGlobales.js";
import rolesUseCase from "../../aplicacion/seguridad/rolesUseCase.js";
import usuarioRolUseCase from "../../aplicacion/usuarios/usuarioRolUseCase.js";
import jwt from "jsonwebtoken";
export const obtenerTicketsUsuario = async (req, res) => {
    try {
        const tickets = await ticketUsuario.obtenerTicketsUsuarioUseCase();
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

export const obtenerTicketUsuarioById = async (req, res) => {

    try {
        const { id } = req.params
        const ticket = await ticketUsuario.obtenerTicketUsuarioByIdUseCase(id);
        res.json(ticket);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: false,
            message: "Error al obtener el ticket " + error.message,
            body: [],
          });
    }
}

export const agregarSolucionTicketUsuario = async (req, res) => {
    try {
        const data = req.body;
        const ticket = await ticketUsuario.agregarSolucionTicketUsuarioUseCase(data);
        res.json(ticket);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: false,
            message: "Error al agregar la solucion al ticket " + error.message,
            body: [],
          });
    }

}

export const crearTicketUsuario = async (req, res) => {
    try {
        const data = req.body;
        
        const ticket = await ticketUsuario.crearTicketUsuarioUseCase(data);
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

export const editarTicketUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const ticket = await ticketUsuario.actualizarTicketUsuarioUseCase(id, data);
        res.json(ticket);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: false,
            message: "Error al editar el ticket " + error.message,
            body: [],
          });
    }
}

export const obtenerTicketsUsuarioConPaginacion = async (req, res) => {
    try {
        const { rol } = req.params;
        const query = req.query;
        const {token} = req.cookies;
        const dataCookie = jwt.verify(token, jwtVariables.jwtSecret);
        //obtengo el int_rol_id dado un rol
        const idRol = await rolesUseCase.obtenerIdRolByNameService(rol);
        //obtener el int_usuario_rol_id del usuario logueado dado el rol
        const usuario = await usuarioRolUseCase.obtenerIdUsuarioRolService(idRol, dataCookie.int_usuario_id);
        const tickets = await ticketUsuario.obtenerTicketUsuariosPaginacionUseCase(query, usuario);
        res.json(tickets);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: false,
            message: "Error al obtener los tickets con paginacion " + error.message,
            body: [],
          });
    }
}

export const obtenerTicketsUsuarioPorEstado = async (req, res) => {

    try {
        const { id } = req.params;
        const ticket = await ticketUsuario.obtenerTicketsUsuarioPorEstadoUseCase(id);
        res.json(ticket);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: false,
            message: "Error al obtener el ticket " + error.message,
            body: [],
          });
    }
}

export const obtenerTicketsUsuarioPorUsuario = async (req, res) => {
    
        try {
            const { id } = req.params;
            const ticket = await ticketUsuario.obtenerTicketsUsuarioPorUsuarioUseCase(id);
            res.json(ticket);
        } catch (error) {
            console.log(error);
            res.status(500).json({
                status: false,
                message: "Error al obtener el ticket " + error.message,
                body: [],
            });
        }
    }

const cambiarEstadoTicketUsuario = async(req,res) =>{
    try{
        const {id} = req.params;
        let estado = 'PASADO'
        const ticket = await ticketUsuario.cambiarEstadoTicketUsuarioUseCase(id,estado);
        res.json(ticket);

    }catch(error){
        console.log(error);
        res.status(500).json({
            status: false,
            message: "Error al cambiar el estado del ticket " + error.message,
            body: [],
          });
    }
}

export default {
    obtenerTicketsUsuario,
    obtenerTicketUsuarioById,
    crearTicketUsuario,
    editarTicketUsuario,
    obtenerTicketsUsuarioConPaginacion,
    obtenerTicketsUsuarioPorEstado,
    obtenerTicketsUsuarioPorUsuario,
    agregarSolucionTicketUsuario,
    cambiarEstadoTicketUsuario
}
