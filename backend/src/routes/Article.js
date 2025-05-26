import express from "express";
import articleController from "../controllers/articleController.js";

const router = express.Router();

router
  .route("/")
  .get(articleController.getArticle)
  .post(articleController.insertArticle);

router
  .route("/:id")
  .put(articleController.updateArticle)
  .delete(articleController.deleteArticle);

export default router;