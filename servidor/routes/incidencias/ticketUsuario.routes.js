import Router from 'express';
import ticketUsuarioControllers from '../../controllers/incidencias/ticketUsuario.controllers.js'
const router = Router();




router.get("/filtrar/:rol", ticketUsuarioControllers.filtrarTicketsUsuario);
router.get("/buscar/:rol", ticketUsuarioControllers.buscarTicketUsuario);
router.get("/:rol", ticketUsuarioControllers.obtenerTicketsUsuarioConPaginacion);
router.post("/solucion", ticketUsuarioControllers.agregarSolucionTicketUsuario);
router.post("/", ticketUsuarioControllers.crearTicketUsuario);
router.get("/solucion/:id", ticketUsuarioControllers.obtenerTicketUsuarioById);
router.put("/:id", ticketUsuarioControllers.editarTicketUsuario);
router.put("/estado/:id", ticketUsuarioControllers.cambiarEstadoTicketUsuario);




export default router;