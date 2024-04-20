import servicioRepository from "../../repositories/incidencias/servicioRepository.js";
import {
    paginacion,
    obtenerDataQueryPaginacion,
    validarPaginacion,
  } from "../utils/paginacion.utils.js";

const crearServicioService = async (data) => {
   
    const servicio = await servicioRepository.obtenerServicioPorNombreRepository(data.nombre);
    if (servicio) {
        return {
            status:false,
            message:"El servicio ya existe",
            body:[]
        };
    }

    //creo el objeto servicio
    const servicioInfo = {
        str_servicio_nombre: data.nombre,
    };

    const servicioCreado = await servicioRepository.crearServicioRepository(servicioInfo);
    if (servicioCreado) {
        return {
            status:true,
            message:"Servicio creado",
            body:servicioCreado
        };
    }else{
        return {
            status:false,
            message:"No se pudo crear el servicio",
            body:[]
        };
    }
};

const obtenerServiciosService = async () => {
    const servicios = await servicioRepository.obtenerAllServiciosRepository();
    if (servicios) {
        return {
            status:true,
            message:"Servicios encontrados",
            body:servicios
        };
    }else{
        return {
            status:false,
            message:"No se encontraron servicios",
            body:[]
        }
    }
};

const actualizarServicioService = async (id, data) => {
    const servicio = await servicioRepository.obtenerServicioByIdRepository(id);
    if (!servicio) {
        return {
            status:false,
            message:"El servicio no existe",
            body:[]
        };
    }

    const servicioActualizado = await servicioRepository.actualizarServicioRepository(id, data);
    if (servicioActualizado) {
        return {
            status:true,
            message:"Servicio actualizado",
            body:servicioActualizado
        };
    }else{
        return {
            status:false,
            message:"No se pudo actualizar el servicio",
            body:[]
        };
    }
}

const cambiarEstadoServicioService = async (id, data) => {
    const servicio = await servicioRepository.obtenerServicioByIdRepository(id);
    if (!servicio) {
        return {
            status:false,
            message:"El servicio no existe",
            body:[]
        };
    }
    let str_servicio_estado = data.estado;

    const servicioActualizado = await servicioRepository.cambiarEstadoRepository(id, {str_servicio_estado});
    if (servicioActualizado) {
        return {
            status:true,
            message:"Estado del servicio actualizado",
            body:servicioActualizado
        };
    }else{
        return {
            status:false,
            message:"No se pudo actualizar el estado del servicio",
            body:[]
        };
    }

}

const buscarServicioService = async (texto,page) => {
    //convierto page en numero
    page = parseInt(page);
    //llamo a repositorio para buscar el servicio dado el texto
    const {servicios,totalServicios} = await servicioRepository.buscarServicioRepository(texto,page);
    if (servicios.length > 0) {
        const metadata = paginacion(page, 10, totalServicios);
        return {
            status:true,
            message:"Servicios encontrados",
            body:servicios,
            metadata:{
                pagination:metadata
            }
        };
    }else{
        return {
            status:false,
            message:"No se encontraron servicios",
            body:[],
            metadata:{
                pagination:{
                    previousPage: 0,
                    currentPage: 1,
                    nextPage: null,
                    total: servicios.length,
                    limit: servicios.length,
                }
            }
        };
    }
}
const filtrarServiciosService = async (texto,page) => {
    //convierto page en numero
    page = parseInt(page);
    //llamo a repositorio para buscar el servicio dado el texto
    const {servicios,totalServicios} = await servicioRepository.filtrarServicioRepository(texto,page);
    if (servicios.length > 0) {
        const metadata = paginacion(page, 10, totalServicios);
        return {
            status:true,
            message:"Servicios encontrados",
            body:servicios,
            metadata:{
                pagination:metadata
            }
        };
    }else{
        return {
            status:false,
            message:"No se encontraron servicios",
            body:[],
            metadata:{
                pagination:{
                    previousPage: 0,
                    currentPage: 1,
                    nextPage: null,
                    total: servicios.length,
                    limit: servicios.length,
                }
            }
        };
    }
} 

const obtenerServiciosPaginacionService = async (query) => {
    const validacion = validarPaginacion(query);
    if(validacion!= true){
        return validacion;
    }
    //obtengo los datos de la query
    const {page,limit} = obtenerDataQueryPaginacion(query);
    //llamo a repositorio para obtener los servicios
    const servicios = await servicioRepository.obtenerServicioConPaginacionRepository(page,limit);
    const totalServicios = await servicioRepository.obtenerTotalServiciosRepository();
    if (servicios.length > 0) {
        const metadata = paginacion(page, limit, totalServicios);
        return {
            status:true,
            message:"Servicios encontrados",
            body:servicios,
            metadata:{
                pagination:metadata
            }
        };
    }
    return {
        status:false,
        message:"No se encontraron servicios",
        body:[],
    }
}

export default {
    crearServicioService,
    obtenerServiciosService,
    actualizarServicioService,
    cambiarEstadoServicioService,
    buscarServicioService,
    filtrarServiciosService,
    obtenerServiciosPaginacionService
}
