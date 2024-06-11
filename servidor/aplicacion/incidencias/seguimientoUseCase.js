import ticketRepository from '../../repositories/incidencias/ticketRepository.js';
import {obtenerVulnerabilidadByIdRepository} from '../../repositories/incidencias/vulnerabilidadesRepository.js';

const obtenerSeguimientoByTicketIdUseCase = async (id) => {
    try {
        //obtengo la información del ticket
        const infoTicket = await ticketRepository.obtenerTicketByIdRepository(id);

        //obtengo la información de la vulnerabiliad "int_vulnerabilidades_id"
        const vulnerabilidad = await obtenerVulnerabilidadByIdRepository(infoTicket.int_vulnerabilidades_id);

        const seguimiento = await ticketRepository.obtenerSeguimientoByTicketIdRepository(id);
        if (!seguimiento || seguimiento.length === 0) {
            return {
                status: false,
                message: "No se encontró seguimiento",
                body: [],
            };
        }
        
        return {
            status: true,
            message: "Seguimiento obtenido correctamente",
            body: seguimiento,
            ticket: infoTicket,
            vulnerabilidad: vulnerabilidad
        };
    } catch (error) {
        console.log(error.message);
        return {
            status: false,
            message: error.message,
            body: [],
        };
    }
};


export default {
    obtenerSeguimientoByTicketIdUseCase,
};