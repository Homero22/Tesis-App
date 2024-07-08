import notificacionesUseCase from "../../aplicacion/incidencias/notificacionesUseCase.js";
import jwt from "jsonwebtoken";
import { jwtVariables } from "../../configuracion/variablesGlobales.js";
import rolesUseCase from "../../aplicacion/seguridad/rolesUseCase.js";
import usuarioRolUseCase from "../../aplicacion/usuarios/usuarioRolUseCase.js";


export const crearNotificacion = async (req, res) => {
    try {
        const data = req.body;
        const dataCreate = await notificacionesUseCase.crearNotificacionUseCase(data);
        res.status(200).json(dataCreate);
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message,
            body: [],
        });
    }
};

export const eliminarNotificacion = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await notificacionesUseCase.eliminarNotificacionUseCase(id);
        res.json(data);
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message,
            body: [],
        });
    }
};

export const obtenerNotificacionesByIdUsuario = async (req, res) => {
    try {

        const { rol } = req.params;
        
        const {token} = req.cookies;
        
        const dataCookie = jwt.verify(token, jwtVariables.jwtSecret);
        //obtengo el int_rol_id dado un rol
        const idRol = await rolesUseCase.obtenerIdRolByNameService(rol);

        //obtener el int_usuario_rol_id del usuario logueado dado el rol
        const usuario = await usuarioRolUseCase.obtenerIdUsuarioRolService(idRol, dataCookie.int_usuario_id);

        const data = await notificacionesUseCase.obtenerNotificacionesByIdUsuarioUseCase(usuario.body.int_usuario_id);

        return res.json(data);
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message,
            body: [],
        });
    }
};

const eliminarAllNotificacionesByIdUsuario = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await notificacionesUseCase.eliminarAllNotificacionesByIdUsuarioUseCase(id);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message,
            body: [],
        });
    }
}

export default {
    crearNotificacion,
    eliminarNotificacion,
    obtenerNotificacionesByIdUsuario,
    eliminarAllNotificacionesByIdUsuario
};