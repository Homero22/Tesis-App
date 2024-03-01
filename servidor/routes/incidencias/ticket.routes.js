import { Router } from "express";
import ticketControllers from "../../controllers/incidencias/ticket.controllers.js";

const router = Router();

router.post("/", ticketControllers.crearTicket);
router.get("/", ticketControllers.obtenerTickets);

export default router;