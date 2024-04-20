import vulnerabilidadesUseCase from "../../aplicacion/incidencias/vulnerabilidadesUseCase.js";

export const importarVulnerabilidades = async (req, res) => {
    try {
        const file = req.file;
        console.log("nombre?",file.originalname);
        const vulnerabilidadesCreadas = await vulnerabilidadesUseCase.importarVulnerabilidadesService(file.path, file.originalname);
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

const buscarVulnerabilidades = async (req, res) => {
    try {
        const {texto,page} = req.query;
        const vulnerabilidades = await vulnerabilidadesUseCase.buscarVulnerabilidadesService(texto,page);
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
const filtrarVulnerabilidades = async (req, res) => {
    try {
        const { filtro,page } = req.query;
        const vulnerabilidades = await vulnerabilidadesUseCase.filtrarVulnerabilidadesService(filtro,page);
        res.json(vulnerabilidades);
    } catch (error) {
        res.status(500).json({
            status: false,
            message: "Error en el servidor" + error,
            body: [],
        });
    }
}


export default {
    importarVulnerabilidades,
    obtenerVulnerabilidadesPagination,
    buscarVulnerabilidades,
    filtrarVulnerabilidades
}