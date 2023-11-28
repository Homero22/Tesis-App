import { Router } from "express";
import authRoutes from "./auth/auth.routes.js";
import usuariosRoutes from "./seguridad/usuarios.routes.js";
import rolesRoutes from "./seguridad/roles.routes.js";

const router = Router();

router.get("/info", (req, res) => {
    res.json({
      Nombre: "Sistema de registro y seguimiento de incidencias",
      Version: "1.0.0",
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
router.use("/usuarios", usuariosRoutes);
router.use("/roles", rolesRoutes);






export default router;