import seguimientoUseCase from "../../aplicacion/incidencias/seguimientoUseCase.js";

const obtenerSeguimientoByTicketIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await seguimientoUseCase.obtenerSeguimientoByTicketIdUseCase(id);
        res.json(response);
    } catch (error) {
        console.log(error.message); 
        res.status(500).json({
            status: false,
            message: error.message,
            body: [],
        });
    }
};


export default {
    obtenerSeguimientoByTicketIdController,
};