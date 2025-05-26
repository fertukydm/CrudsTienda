 import express from "express";
import productController from "../controllers/ordersController";
import ordersController from "../controllers/ordersController";
 
const router = express.Router();
 
router
  .route("/")
  .get(ordersController.getOrders)
  .post(ordersController.insertOrders);
 
router
  .route("/:id")
  .put(ordersController.updateOrders)
  .delete(ordersController.deleteOrders);
 
export default router;