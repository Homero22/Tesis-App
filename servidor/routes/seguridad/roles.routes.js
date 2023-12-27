import { Router } from "express";

import rolesController from "../../controllers/seguridad/roles.controllers.js";

const router = Router();

router.get("/", rolesController.obtenerRoles);
router.get("/all", rolesController.obtenerTodosRoles);
router.get("/buscar", rolesController.buscarRol);
router.get("/filtrar", rolesController.filtrarRoles);
router.get("/:id", rolesController.obtenerRol);
router.post("/", rolesController.crearRol);
router.put("/:id", rolesController.actualizarRol);
router.put("/desactivar/:id", rolesController.desactivarRol);

export default router;