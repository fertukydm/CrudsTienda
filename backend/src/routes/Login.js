import express from "express";
import loginController from "../controllers/loginController.js";
import loginController from "../controllers/loginController.js";

const router = express.Router();

router
  .route("/")
  .get(loginController.getLogin)
  .post(loginController.insertLogin);

router
  .route("/:id")
  .put(loginController.updateLogin)
  .delete(loginController.deleteLogin);

export default router;