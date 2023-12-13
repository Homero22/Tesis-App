import {Router} from 'express';
import menusController from '../../controllers/seguridad/menus.controllers.js';

const router = Router();

router.get("/", menusController.obtenerMenus);
router.get("/buscar", menusController.buscarMenu);
router.get("/filtrar", menusController.filtrarMenus);
router.get("/:id", menusController.obtenerMenu);
router.post("/", menusController.crearMenu);
router.put("/:id", menusController.actualizarMenu);
router.put("/desactivar/:id", menusController.desactivarMenu);
router.get("/submenus/:id", menusController.obtenerSubmenus);


export default router; 