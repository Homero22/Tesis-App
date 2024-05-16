import { Router } from "express";
import ticketControllers from "../../controllers/incidencias/ticket.controllers.js";

const router = Router();
router.get("/", ticketControllers.obtenerTicketsConPaginacion);
router.post("/", ticketControllers.crearTicket);
router.get("/all", ticketControllers.obtenerTickets);




export default router;