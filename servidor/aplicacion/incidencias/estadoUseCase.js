import { parse } from 'dotenv';
import estadoRepository from '../../repositories/incidencias/estadoRepository.js'
import {
    paginacion,
    obtenerDataQueryPaginacion,
    validarPaginacion,
  } from "../utils/paginacion.utils.js";

const crearEstadoService = async (data) => {
    const estado = await estadoRepository.obtenerEstadoPorNombreRepository(data.nombre);
    if (estado) {
        return {
            status:false,
            message:"El estado ya existe",
            body:[]
        };
    }

    //creo el objeto estado
    const estadoInfo = {
        str_estado_nombre: data.nombre,
    };

    const estadoCreado = await estadoRepository.crearEstadoRepository(estadoInfo);
    if (estadoCreado) {
        return {
            status:true,
            message:"Estado creado",
            body:estadoCreado
        };
    }else{
        return {
            status:false,
            message:"No se pudo crear el estado",
            body:[]
        };
    }
};

const obtenerEstadosService = async () => {
    const estados = await estadoRepository.obtenerAllEstadosRepository();
    if (estados) {
        return {
            status:true,
            message:"Estados encontrados",
            body:estados
        };
    }else{
        return {
            status:false,
            message:"No se encontraron estados",
            body:[]
        }
    }
};
const obtenerEstadosConPaginacionService = async (query) => {

    const validacion = validarPaginacion(query);
    if(validacion != true){
        return validacion;
    
    }
    //obtener los datos de la query
    const { page, limit } = obtenerDataQueryPaginacion(query);
    //obtener todos los estados
    const estados = await estadoRepository.obtenerEstadosConPaginacionRepository(page, limit);
    //obtener el total de registros de estados
    const totalEstados = await estadoRepository.obtenerTotalEstadoRepository();
    if (estados.length > 0) {
        const metadata = paginacion(page, limit, totalEstados);
        return {
            status:true,
            message:"Estados encontrados",
            body:estados,
            metadata:{
                pagination:metadata
            }
        };
    }
    return {
        status:false,
        message:"No se encontraron estados",
        body:[]
    };
};

const actualizarEstadoService = async (id, data) => {
    const estado = await estadoRepository.obtenerEstadoByIdRepository(id);
    if (!estado) {
        return {
            status:false,
            message:"El estado no existe",
            body:[]
        };
    }

    const estadoActualizado = await estadoRepository.actualizarEstadoRepository(id, data);
    if (estadoActualizado) {
        return {
            status:true,
            message:"Estado actualizado",
            body:estadoActualizado
        };
    }else{
        return {
            status:false,
            message:"No se pudo actualizar el estado",
            body:[]
        };
    }
};

const cambiarEstadoService = async (id, data) => {
    const estado = await estadoRepository.obtenerEstadoByIdRepository(id);
    if (!estado) {
        return {
            status:false,
            message:"El estado no existe",
            body:[]
        };
    }

    const estadoActualizado = await estadoRepository.cambiarEstadoRepository(id, data);
    if (estadoActualizado) {
        return {
            status:true,
            message:"Estado del estado actualizado",
            body:estadoActualizado
        };
    }else{
        return {
            status:false,
            message:"No se pudo actualizar el estado del estado",
            body:[]
        };
    }
};

const buscarEstadoService = async (texto, page) => {
    page = parseInt(page);
    //llamo a repositorio para buscar el estado dado el texto
    const {estados, totalEstados} = await estadoRepository.buscarEstadoRepository(texto, page);
    if (estados.length > 0){
        const metadata = paginacion(page, 10, totalEstados);
        return {
            status:true,
            message:"Estados encontrados",
            body:estados,
            metadata:{
                pagination:metadata
            }
        };
    }else{
        return {
            status:false,
            message:"No se encontraron estados",
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

const filtrarEstadosService = async (texto, page) => {
    page = parseInt(page);
    const { estados, totalEstados } = await estadoRepository.filtrarEstadoRepository(texto, page);
    if (estados.length > 0) {
        const metadata = paginacion(page, 10, totalEstados);
        return {
            status: true,
            message: "Estados encontrados",
            body: estados,
            metadata: {
                pagination: metadata,
            },
        };
    } else {
        return {
            status: false,
            message: "No se encontraron estados",
            body: [],
            metadata: {
                pagination: {
                    previousPage: 0,
                    currentPage: 1,
                    nextPage: null,
                    total: estados.length,
                    limit: estados.length,
                },
            },
        };
    }
};
const obtenerEstadoByIdService = async (id) => {
    const estado = await estadoRepository.obtenerEstadoByIdRepository(id);
    if (estado) {
        return {
            status:true,
            message:"Estado encontrado",
            body:estado
        };
    }else{
        return {
            status:false,
            message:"No se encontro el estado",
            body:[]
        };
    }
}

export default {
    crearEstadoService,
    obtenerEstadosService,
    actualizarEstadoService,
    cambiarEstadoService,
    buscarEstadoService,
    filtrarEstadosService,
    obtenerEstadoByIdService,
    obtenerEstadosConPaginacionService
}