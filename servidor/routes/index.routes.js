import { Router } from "express";
import authRoutes from "./auth/auth.routes.js";
import usuariosRoutes from "./seguridad/usuarios.routes.js";
import rolesRoutes from "./seguridad/roles.routes.js";
import menusRoutes from "./seguridad/menus.routes.js";
import usuarioRol from "./seguridad/usuarioRol.routes.js";
import permisosRoutes from "./seguridad/permisos.routes.js";
import vulnerabilidadesRoutes from "./incidencias/vulnerabilidades.routes.js";
import ticketRoutes from "./incidencias/ticket.routes.js";
import notificacionesRoutes from "./notificaciones/notificaciones.routes.js";
import servicioRoutes from "./incidencias/servicio.routes.js";
import estadoRoutes from "./incidencias/estado.routes.js";
import ticketUsuarioRoutes from "./incidencias/ticketUsuario.routes.js"
import seguimientoRoutes from "./incidencias/seguimiento.routes.js";
import notificacionesUsuarioRoutes from "./incidencias/notificaciones.routes.js";
import graficosRoutes from "./incidencias/graficos.routes.js";

const router = Router();


//ruta de informacion del sistema

router.get("/info", (req, res) => {
    res.json({
      Nombre: "Sistema de registro y seguimiento de incidencias",
      Version: "2.0.0",
      Descripcion:
        "Sistema de incidencias para la Escuela Superior Politecnica de Chimborazo",
      Autor: "Homero Ojeda",
      Email: "homero.ojeda@espoch.edu.ec",
      Licencia: "MIT",
      Github: "",
      Documentacion: "",
      Estado: "En desarrollo",
      "Fecha de creacion": "2023-10-16",
      "Fecha de actualizacion": new Date(),
    });
});


router.use("/auth", authRoutes);


//middleware para comprobar si el usuario esta autenticado y tiene token

router.use((req, res, next) => {
  if (req.cookies.token) {
    console.log("Usuario autenticado");
    next();
  } else {
    res.status(401).json({
      status: false,
      message: "Usuario no autorizado",
      body: [],
    });
  }
});


router.use("/usuarios", usuariosRoutes);
router.use("/roles", rolesRoutes);
router.use("/menus", menusRoutes);
router.use("/usuarioRol", usuarioRol);
router.use("/permisos", permisosRoutes);
router.use("/vulnerabilidades", vulnerabilidadesRoutes);
router.use("/tickets", ticketRoutes);
router.use("/tickets/usuario", ticketUsuarioRoutes);
router.use("/notificaciones", notificacionesRoutes);
router.use("/servicios", servicioRoutes);
router.use("/estados", estadoRoutes);
router.use("/seguimiento", seguimientoRoutes);
router.use("/notificacionesUsuario", notificacionesUsuarioRoutes);
router.use("/graficos", graficosRoutes);








export default router;