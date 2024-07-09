import graficosUseCase from "../../aplicacion/incidencias/graficosUseCase.js";

const obtenerIncidenciasPorMes = async (req, res) => {
    const { anio } = req.params;
    try {
        console.log("params",anio);
        const data = await graficosUseCase.obtenerIncidenciasPorMesService(anio);
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export default {
    obtenerIncidenciasPorMes,
}