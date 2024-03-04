import {Router} from 'express';
import notificacionesController from '../../controllers/notificaciones/notificaciones.controller.js';

const router = Router();

router.post('/enviar', notificacionesController.enviarNotificacion);
router.get('/suscribir', notificacionesController.suscribir);

export default router;