import usuarioRol from "../../aplicacion/usuarios/usuarioRolUseCase.js";
import { jwtVariables } from "../../configuracion/variablesGlobales.js";
import jwt from "jsonwebtoken";
import { eventEmitter } from "../notificaciones/notificaciones.controller.js";
import  NotificacionesUsuarioUseCase from "../../aplicacion/incidencias/notificacionesUseCase.js"
const obtenerRolesPorUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const roles = await usuarioRol.obtenerRolesPorUsuarioService(id);
        res.json(roles);
    } catch (error) {
        console.log(error);
        res.status(500).json({
        status: false,
        message: "Error en el servidor" + error,
        body: [],
        });
    }
};

const obtenerRolesUsuarioLogueado = async (req, res) => {
    try{
        const {token} = req.cookies;
        const dataCookie = jwt.verify(token, jwtVariables.jwtSecret);

        const roles = await usuarioRol.obtenerRolesPorUsuarioService(dataCookie.int_usuario_id);
        
        res.json(roles);

    }catch(error){
        console.log(error);
        res.status(500).json({
        status: false,
        message: "Error en el servidor" + error,
        body: [],
        });
    }

}

const crearUsuarioRol = async (req, res) => {
    try {
        const { idRol, idUsuario } = req.body;

        const usuarioRolCreado = await usuarioRol.crearUsuarioRolService(
        idRol,
        idUsuario
        );
        res.json(usuarioRolCreado);
    } catch (error) {
        res.status(500).json({
        status: false,
        message: "Error en el servidor" + error,
        body: [],
        });
    }
};

const cambiarEstadoUsuarioRol = async (req, res) => {
    try {
        const { id } = req.params;
        const usuarioRolDesactivado = await usuarioRol.cambiarEstadoUsuarioRolService(id);
        res.json(usuarioRolDesactivado); 

        //guardar notificacion
        const usuario = await usuarioRol.obtenerIdUsuarioByIdUsuarioRolService(id);
        eventEmitter.emit('notificacion', {
            tipo: 'success', 
            mensaje: "Se ha cambiado el estado de un perfil de un usuario",
            int_usuario_id: usuario.body.int_usuario_id
        });

        const notificacion = {
            int_usuario_id: usuario.body.int_usuario_id,
            str_notificacion_descripcion: "Se ha cambiado el estado del perfil",
            str_notificacion_titulo: "Cambio de estado de perfil",
            dt_fecha_creacion: new Date()
        }
        const notificacionCreada = await NotificacionesUsuarioUseCase.crearNotificacionUseCase(notificacion);
    } catch (error) {
        res.status(500).json({
        status: false,
        message: "Error en el servidor" + error,
        body: [],
        });
    }
};


export default {
    obtenerRolesPorUsuario,
    crearUsuarioRol,
    cambiarEstadoUsuarioRol,
    obtenerRolesUsuarioLogueado,
}