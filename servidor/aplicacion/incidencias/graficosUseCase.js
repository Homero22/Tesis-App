import graficosRepository from "../../repositories/incidencias/graficosRepository.js";

const obtenerIncidenciasPorMesService = async (anio) => {

    const data = await graficosRepository.obtenerIncidenciasPorMesRepository(anio);
    if(!data){
        return {
            status:false,
            message: "No se encontraron incidencias registradas",
            body: []
        }
    }
    return {
        status:true,
        message: "Incidencias por mes",
        body: data
    }
};

export default {
    obtenerIncidenciasPorMesService
};
