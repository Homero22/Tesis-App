import { Router } from "express";
import estadoController from "../../controllers/incidencias/estado.controllers.js";

const router = Router();

router.get("/", estadoController.obtenerEstadosConPaginacion);

router.post("/", estadoController.crearEstado);
router.put("/:id", estadoController.actualizarEstado);
router.put("/desactivar/:id", estadoController.cambiarEstadoEstado);
router.get("/buscar", estadoController.buscarEstados);
router.get("/filtrar", estadoController.filtrarEstados);
router.get("/:id", estadoController.obtenerEstado);

export default router;
