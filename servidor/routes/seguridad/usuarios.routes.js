import { Router } from "express";

import usuariosController from "../../controllers/seguridad/usuarios.controllers.js";

const router = Router();

router.get("/miCuenta", usuariosController.obtenerDatosMiCuenta);
router.get("/", usuariosController.obtenerUsuarios);
router.get("/buscar", usuariosController.buscarUsuario);
router.get("/buscar/registrado", usuariosController.buscarUsuariosRegistrados);
router.get("/filtrar", usuariosController.filtrarUsuarios);
router.get("/centralizada/:cedula", usuariosController.obtenerUsuariosCentralizada);
router.post("/", usuariosController.crearUsuario);
router.get("/:id", usuariosController.obtenerUsuario);
router.put("/:id", usuariosController.actualizarUsuario);
router.put("/desactivar/:id", usuariosController.desactivarUsuario);



export default router;