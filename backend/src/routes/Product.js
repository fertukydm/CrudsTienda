 import express from "express";
import productController from "../controllers/productController";
import promotionsController from "../controllers/promotionsController";
 
const router = express.Router();
 
router
  .route("/")
  .get(productController.getProduct)
  .post(productController.insertProduct);
 
router
  .route("/:id")
  .put(productController.updateProduct)
  .delete(productController.deleteProduct);

router
  .route("/")
  .get(promotionsController.getPromotions)
  .post(promotionsController.insertPromotions);

  router
  .route("/:id")
  .put(promotionsController.updatePromotions)
  .delete(promotionsController.deletePromotions);
 
export default router;