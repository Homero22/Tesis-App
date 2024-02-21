import vulnerabilidadesUseCase from "../../aplicacion/incidencias/vulnerabilidadesUseCase.js";

export const importarVulnerabilidades = async (req, res) => {
    try {
        const file = req.file;
        const vulnerabilidadesCreadas = await vulnerabilidadesUseCase.importarVulnerabilidadesService(file.path);
        res.json(vulnerabilidadesCreadas);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error al importar las vulnerabilidades" });
    }
}

export const obtenerVulnerabilidadesPagination = async (req, res) => {
    try {
        const query = req.query;
        const vulnerabilidades = await vulnerabilidadesUseCase.obtenerVulnerabilidadesPaginationService(query);
        
        res.json(vulnerabilidades);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            status: false,
            message: "Error en el servidor" + error,
            body: [],
        
        })
    }
}


export default {
    importarVulnerabilidades,
    obtenerVulnerabilidadesPagination
}