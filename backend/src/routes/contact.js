import express from "express";
import contactController from "../controllers/contactController.js";

const router = express.Router();

router.route("/")
  .post(contactController.create)
  .get(contactController.getAll); // Solo para admin

export default router;
