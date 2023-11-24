import { Router } from "express";

import usuariosController from "../../controllers/usuarios/usuarios.controllers.js";

const router = Router();

router.get("/miCuenta", usuariosController.obtenerDatosMiCuenta);
router.get("/", usuariosController.obtenerUsuarios);
router.get("/:id", usuariosController.obtenerUsuario);
router.post("/", usuariosController.crearUsuario);
router.put("/:id", usuariosController.actualizarUsuario);
router.put("/desactivar/:id", usuariosController.desactivarUsuario);


export default router;