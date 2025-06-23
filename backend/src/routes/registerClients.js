import express from "express";
import registerClientsController from "../controllers/registerClientsController.js";

const router = express.Router();

// Registro y verificación por código
router.route("/").post(registerClientsController.register);
router.route("/verifyCodeEmail").post(registerClientsController.verifyCodeEmail);

export default router;
