import express from "express";
import productController from "../controllers/productController.js";

const router = express.Router();

router.route("/")
  .get(productController.getProducts)
  .post(productController.insertProduct);

router.route("/:id")
  .put(productController.updateProduct)
  .delete(productController.deleteProduct);

export default router; 

