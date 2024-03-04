import { Router } from "express";
import multer from "multer";

import vulnerabilidadesControllers from "../../controllers/incidencias/vulnerabilidades.controllers.js";

const upload = multer({ dest: "uploads/" });

const router = Router();

router.post("/", upload.single("file"), vulnerabilidadesControllers.importarVulnerabilidades);
router.get("/", vulnerabilidadesControllers.obtenerVulnerabilidadesPagination);
router.get("/buscar", vulnerabilidadesControllers.buscarVulnerabilidades);
router.get("/filtrar", vulnerabilidadesControllers.filtrarVulnerabilidades);

export default router;
