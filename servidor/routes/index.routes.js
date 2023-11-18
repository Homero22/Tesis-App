import { Router } from "express";
import authRoutes from "./auth/auth.routes.js";
import usuariosRoutes from "./usuarios/usuarios.routes.js"

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





export default router;