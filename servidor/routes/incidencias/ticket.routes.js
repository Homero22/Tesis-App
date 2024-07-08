import { Router } from "express";
import ticketControllers from "../../controllers/incidencias/ticket.controllers.js";

const router = Router();
router.put("/finalizar/:id", ticketControllers.finalizarTicket);
router.get("/soluciones/:id", ticketControllers.obtenerSolucionesTicketById);
router.get("/", ticketControllers.obtenerTicketsConPaginacion);
router.post("/", ticketControllers.crearTicket);
router.get("/all", ticketControllers.obtenerTickets);
router.put("/:id", ticketControllers.editarTicket);
router.patch("/:id", ticketControllers.pasarTicket);
router.get("/reporte", ticketControllers.reporteTickets);
router.put("/revision/:id", ticketControllers.enviarRevision);







export default router;