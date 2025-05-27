import express from "express";
import categoriesController from "../controllers/categoriesController.js";

const router = express.Router();

router
  .route("/")
  .get(categoriesController.getCategories)
  .post(categoriesController.insertCategories);

router
  .route("/:id")
  .put(categoriesController.updateCategories)
  .delete(categoriesController.deleteCategories);

export default router;