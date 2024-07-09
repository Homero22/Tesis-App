import { Router } from "express";
import historialVulnerabilidadesControllers from "../../controllers/incidencias/historialVulnerabilidades.controllers.js";

const router = Router();

router.get("/", historialVulnerabilidadesControllers.obtenerAllVulnerabilidades);

export default router;