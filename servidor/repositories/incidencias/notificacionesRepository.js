import { NotificacionesUsuario } from "../../models/incidencias/notificacionesUsuario.js";


const crearNotificacionRepository = async (data) => {
    try {
        const dataCreate = await NotificacionesUsuario.create(data);
        return dataCreate;
    } catch (error) {
        console.log(error);
        return error.message;
    }
};

const eliminarNotificacionRepository = async (id) => {
    try {
        const data = await NotificacionesUsuario.destroy({
            where: {
                int_notificacion_id: id
            }
        });
        return data;
    } catch (error) {
        console.log(error);
        return error.message;
    }
};

const obtenerNotificacionesByIdUsuarioRepository = async (id) => {
    try {
        const data = await NotificacionesUsuario.findAll({
            where: {
                int_usuario_id: id
            }
        });
        return data;
    } catch (error) {
        console.log(error);
        return error.message;
    }
};

const eliminarAllNotificacionesByIdUsuarioRepository = async (id) => {
    try {
        const data = await NotificacionesUsuario.destroy({
            where: {
                int_usuario_id: id
            }
        });
        return data;
    } catch (error) {
        console.log(error);
        return error.message;
    }
}

export default {
    crearNotificacionRepository,
    eliminarNotificacionRepository,
    obtenerNotificacionesByIdUsuarioRepository,
    eliminarAllNotificacionesByIdUsuarioRepository
};


