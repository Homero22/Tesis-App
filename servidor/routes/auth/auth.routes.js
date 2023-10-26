import { Router } from "express";
import authControllers from "../../controllers/auth/auth.controller.js";

const router = Router();


router.get("/info", (req, res) => {
    console.log("auth/info");

});

router.post("/validar", authControllers.validarAuth);

export default router;