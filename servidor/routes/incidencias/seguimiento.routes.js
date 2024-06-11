import { Router } from "express";

import seguimientoControllers from "../../controllers/incidencias/seguimiento.controllers.js";

const router = Router();

router.get("/:id", seguimientoControllers.obtenerSeguimientoByTicketIdController);

export default router;