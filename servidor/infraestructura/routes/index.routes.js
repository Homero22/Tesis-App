import { Router } from "express";

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



export default router;