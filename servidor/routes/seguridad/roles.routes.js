import { Router } from "express";

import rolesController from "../../controllers/seguridad/roles.controllers.js";

const router = Router();

router.get("/", rolesController.obtenerRoles);
router.get("/:id", rolesController.obtenerRol);
router.post("/", rolesController.crearRol);
router.put("/:id", rolesController.actualizarRol);

export default router;