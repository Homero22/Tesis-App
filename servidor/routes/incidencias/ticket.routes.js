import { Router } from "express";
import ticketControllers from "../../controllers/incidencias/ticket.controllers.js";

const router = Router();
router.get("/soluciones/:id", ticketControllers.obtenerSolucionesTicketById);
router.get("/", ticketControllers.obtenerTicketsConPaginacion);
router.post("/", ticketControllers.crearTicket);
router.get("/all", ticketControllers.obtenerTickets);
router.put("/:id", ticketControllers.editarTicket);
router.patch("/:id", ticketControllers.pasarTicket);






export default router;