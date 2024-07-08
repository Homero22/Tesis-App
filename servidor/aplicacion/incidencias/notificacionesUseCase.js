import notificacionesRepository from "../../repositories/incidencias/notificacionesRepository.js";

const crearNotificacionUseCase = async (data) => {
    try {
       
        const dataCreate = await notificacionesRepository.crearNotificacionRepository(data);
        return dataCreate;
    } catch (error) {
        console.log(error);
        return error.message;
    }
};

const eliminarNotificacionUseCase = async (id) => {
    try {
        const data = await notificacionesRepository.eliminarNotificacionRepository(id);
        
        if(!data){
            return {
                status:false,
                message: "No se encontró la notificación",
                body: data
               }
        }
        return {
            status:true,
            message: "Notificación eliminada",
            body: data
        }
        
    } catch (error) {
        console.log(error);
        return error.message;
    }
};

const obtenerNotificacionesByIdUsuarioUseCase = async (id) => {

    try {
        const data = await notificacionesRepository.obtenerNotificacionesByIdUsuarioRepository(id);
       if(data.length > 0){
           return {
            status:true,
            message: "Notificaciones encontradas",
            body: data
           }
         }else{
            return {
                status:false,
                message: "No se encontraron notificaciones",
                body: data
               }
         }
    } catch (error) {
        console.log(error);
        return error.message;
    }
};

const eliminarAllNotificacionesByIdUsuarioUseCase = async (id) => {
    try {
        const data = await notificacionesRepository.eliminarAllNotificacionesByIdUsuarioRepository(id);
        return data;
    } catch (error) {
        console.log(error);
        return error.message;
    }
}

export default {
    crearNotificacionUseCase,
    eliminarNotificacionUseCase,
    obtenerNotificacionesByIdUsuarioUseCase,
    eliminarAllNotificacionesByIdUsuarioUseCase
};