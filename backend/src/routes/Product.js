 import express from "express";
import promotionsController from "../controllers/promotionsController";
import productController from "../controllers/productController";
 
const router = express.Router();
 
router
  .route("/")
  .get(productController.getProduct)
  .post(productController.insertProduct);
 
router
  .route("/:id")
  .put(productController.updateProduct)
  .delete(productController.deleteProduct);
 
export default router;