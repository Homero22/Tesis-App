import {Router} from 'express';
import permisosControllers from '../../controllers/seguridad/permisos.controllers.js';

const router = Router();

router.get('/:id', permisosControllers.obtenerPermisosPorIdUsuarioRol);
router.put('/:id', permisosControllers.actualizarPermisosPorIdUsuarioRol);



export default router;