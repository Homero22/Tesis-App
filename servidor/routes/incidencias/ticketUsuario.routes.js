import { Router } from "express";

import ticketUsuarioControllers from "../../controllers/incidencias/ticketUsuario.controllers.js";

const router = Router();

router.get("/", ticketUsuarioControllers.obtenerTicketsUsuario);

export default router;