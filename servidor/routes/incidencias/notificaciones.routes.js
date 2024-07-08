import { Router } from "express";

import notificacionesControllers from "../../controllers/incidencias/notificaciones.controllers.js";

const router = Router();

router.post("/", notificacionesControllers.crearNotificacion);
router.delete("/:id", notificacionesControllers.eliminarNotificacion);
router.get("/:rol", notificacionesControllers.obtenerNotificacionesByIdUsuario);
router.delete("/all/:id", notificacionesControllers.eliminarAllNotificacionesByIdUsuario);

export default router;