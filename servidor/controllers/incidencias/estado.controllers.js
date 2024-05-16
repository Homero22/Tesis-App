import EstadosService from '../../aplicacion/incidencias/estadoUseCase.js'

const crearEstado = async (req, res) => {
    try {
        console.log("Crear Estado")
        const data = req.body;
        console.log(data);
        const estadoCreado = await EstadosService.crearEstadoService(data);
        res.json(estadoCreado);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: false,
            message: "Error en el servidor" + error,
            body: [],
        });
    }
}

const obtenerEstadosConPaginacion = async (req, res) => {
    try {
        console.log("Obtener Estados con paginacion")
        const query = req.query;
        const estados = await EstadosService.obtenerEstadosConPaginacionService(query);
        res.json(estados);
    } catch (error) {
        res.status(500).json({
            status: false,
            message: "Error en el servidor" + error,
            body: [],
        });
    }
}

const obtenerEstado = async (req, res) => {
    try {
        console.log("Obtener Estado")
        const { id } = req.params;
        const estado = await EstadosService.obtenerEstadoByIdService(id);
        res.json(estado);
    } catch (error) {
        res.status(500).json({
            status: false,
            message: "Error en el servidor" + error,
            body: [],
        });
    }
};

const actualizarEstado = async (req, res) => {
    try {
        console.log("Actualizar Estado")
        const { id } = req.params;
        const data = req.body;
        console.log(data);

        const estadoActualizado = await EstadosService.actualizarEstadoService(id, data);
        res.json(estadoActualizado);
    } catch (error) {
        res.status(500).json({
            status: false,
            message: "Error en el servidor" + error,
            body: [],
        });
    }
}

const cambiarEstadoEstado = async (req, res) => {
    try {
        console.log("Cambiar Estado")
        const { id } = req.params;
        const data = req.body;
        console.log("estado",data);
        const estadoActualizado = await EstadosService.cambiarEstadoService(id, data);
        res.json(estadoActualizado);
    } catch (error) {
        res.status(500).json({
            status: false,
            message: "Error en el servidor" + error,
            body: [],
        });
    }

}

const buscarEstados = async (req, res) => {
    try {
        console.log("Buscar Estados")
        const { texto, page } = req.query;
        console.log(texto);
        console.log(page);
        const estados = await EstadosService.buscarEstadoService(texto, page);
        res.json(estados);
    } catch (error) {
        res.status(500).json({
            status: false,
            message: "Error en el servidor" + error,
            body: [],
        });
    }
}

const filtrarEstados = async (req, res) => {
    try {
        console.log("Filtrar Estados")
        const { texto, page } = req.query;
        console.log(req.params)
        console.log(texto);
        console.log(page);
        const estados = await EstadosService.filtrarEstadosService(texto, page);
        res.json(estados);
    } catch (error) {
        res.status(500).json({
            status: false,
            message: "Error en el servidor" + error,
            body: [],
        });
    }
}
const obtenerTodosEstados = async (req, res) => {
    try {
        console.log("Obtener Todos los Estados")
        const estados = await EstadosService.obtenerEstadosService();
        res.json(estados);
    } catch (error) {
        res.status(500).json({
            status: false,
            message: "Error en el servidor" + error,
            body: [],
        });
    }
}

export default {
    crearEstado,
    obtenerEstadosConPaginacion,
    obtenerEstado,
    actualizarEstado,
    cambiarEstadoEstado,
    buscarEstados,
    filtrarEstados,
    obtenerTodosEstados
}