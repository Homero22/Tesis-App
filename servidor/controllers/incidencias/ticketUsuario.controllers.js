import ticketUsuarioUseCase from "../../aplicacion/incidencias/ticketUsuarioUseCase.js";

const obtenerTicketsUsuarioController = async (req, res) => {
    try {
        const tickets = await ticketUsuarioUseCase.obtenerTicketsUsuarioService();
        res.json(tickets);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error al obtener los tickets" });
    }
}

export default {
    obtenerTicketsUsuarioController,
};