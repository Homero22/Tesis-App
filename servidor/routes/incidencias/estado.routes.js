import { Router } from "express";
import estadoController from "../../controllers/incidencias/estado.controllers.js";

const router = Router();

router.get("/", estadoController.obtenerEstadosConPaginacion);
router.get("/:id", estadoController.obtenerEstado);
router.post("/", estadoController.crearEstado);
router.put("/:id", estadoController.actualizarEstado);
router.put("/estado/:id", estadoController.cambiarEstadoEstado);
router.get("/buscar", estadoController.buscarEstados);
router.get("/filtrar", estadoController.filtrarEstados);

export default router;
