import {Router} from 'express';
import usuarioRolController from '../../controllers/seguridad/usuarioRol.controllers.js';

const router = Router();
router.get('/usuarioLogueado', usuarioRolController.obtenerRolesUsuarioLogueado);
router.get('/:id', usuarioRolController.obtenerRolesPorUsuario);
router.post('/', usuarioRolController.crearUsuarioRol);
router.put('/:id', usuarioRolController.cambiarEstadoUsuarioRol);



export default router;