import { Router } from "express";

import usuariosController from "../../controllers/usuarios/usuarios.controllers.js";

const router = Router();

router.get("/miCuenta", usuariosController.obtenerDatosMiCuenta);
router.get("/", usuariosController.obtenerUsuarios);
router.post("/", usuariosController.crearUsuario);
router.put("/:id", usuariosController.actualizarUsuario);


export default router;