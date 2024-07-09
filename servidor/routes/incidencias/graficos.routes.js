import { Router } from "express";

import graficosController from "../../controllers/incidencias/graficos.controllers.js";

const router = Router();

router.get("/incidencias-por-mes/:anio", graficosController.obtenerIncidenciasPorMes);

export default router;
