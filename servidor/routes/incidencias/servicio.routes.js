import { Router } from "express";

import servicioController from "../../controllers/incidencias/servicio.controllers.js";

const router = Router();

router.get("/", servicioController.obtenerServiciosConPaginacion);
router.get("/all", servicioController.obtenerTodosServicios);
router.post("/", servicioController.crearServicio);
router.put("/:id", servicioController.actualizarServicio);
router.put("/desactivar/:id", servicioController.cambiarEstadoServicio);
router.get("/buscar", servicioController.buscarServicios);
router.get("/filtrar", servicioController.filtrarServicios);


export default router;