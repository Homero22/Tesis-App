import {Router} from 'express';
import menusControllers from '../../controllers/seguridad/menus.controllers.js';

const router = Router();

router.get('/', menusControllers.obtenerMenus);
router.get('/:id', menusControllers.obtenerMenu);
router.get('/submenus/:id', menusControllers.obtenerSubmenus);
router.post('/', menusControllers.crearMenu);

export default router;