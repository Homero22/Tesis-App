import ServiciosService from '../../aplicacion/incidencias/servicioUseCase.js'

const crearServicio = async (req, res) => {
    try {
        const data = req.body;
        console.log(data);
        const servicioCreado = await ServiciosService.crearServicioService(data);
        res.json(servicioCreado);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: false,
            message: "Error en el servidor" + error,
            body: [],
        });
    }
}

const obtenerServiciosConPaginacion = async (req, res) => {
    try {
        const query = req.query;
        const servicios = await ServiciosService.obtenerServiciosPaginacionService(query);
        res.json(servicios);
    } catch (error) {
        res.status(500).json({
            status: false,
            message: "Error en el servidor" + error,
            body: [],
        });
    }
}

const actualizarServicio = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        console.log("id",id);
        console.log("data",data);
        const servicioActualizado = await ServiciosService.actualizarServicioService(id, data);
        res.json(servicioActualizado);
    } catch (error) {
        res.status(500).json({
            status: false,
            message: "Error en el servidor" + error,
            body: [],
        });
    }
}

const cambiarEstadoServicio = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        console.log("id",id);
        console.log("data",data);
        const estadoActualizado = await ServiciosService.cambiarEstadoServicioService(id, data);
        res.json(estadoActualizado);
    } catch (error) {
        res.status(500).json({
            status: false,
            message: "Error en el servidor" + error,
            body: [],
        });
    }
}
const buscarServicios = async (req, res) => {
    try {
        const { texto, page } = req.query;
        console.log("params",req.params);
        console.log("texto",texto);
        console.log("page",page);
        const servicios = await ServiciosService.buscarServicioService(texto, page);
        console.log("servicio encontrado",servicios);
        res.json(servicios);
    } catch (error) {
        res.status(500).json({
            status: false,
            message: "Error en el servidor" + error,
            body: [],
        });
    }
}

const filtrarServicios = async (req, res) => {
    try {
        const { texto, page } = req.query;
        console.log("texto",texto);
        console.log("page",page);
        const servicios = await ServiciosService.filtrarServiciosService(texto, page);
        res.json(servicios);
    } catch (error) {
        res.status(500).json({
            status: false,
            message: "Error en el servidor" + error,
            body: [],
        });
    }
}

export default {
    crearServicio,
    obtenerServiciosConPaginacion,
    actualizarServicio,
    cambiarEstadoServicio,
    buscarServicios,
    filtrarServicios
}