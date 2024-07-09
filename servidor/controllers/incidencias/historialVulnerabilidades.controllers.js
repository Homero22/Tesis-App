import historialVulnerabilidadesUseCase from "../../aplicacion/incidencias/historialVulnerabilidadesUseCase.js";

export const obtenerAllVulnerabilidades = async (req, res) => {
    try {
        const vulnerabilidades = await historialVulnerabilidadesUseCase.obtenerAllVulnerabilidadesService();
        res.json(vulnerabilidades);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: false,
            message: "Error en el servidor" + error,
            body: [],
        });
    }
}

export default {
    obtenerAllVulnerabilidades,
}