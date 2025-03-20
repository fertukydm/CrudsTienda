import express from "express";
import userController from "../controllers/userController.js";

const router = express.Router();

router
  .route("/")
  .get(userController.getUser)
  .post(userController.insertUser);

router
  .route("/:id")
  .put(userController.updateUser)
  .delete(userController.deleteuser);

export default router;