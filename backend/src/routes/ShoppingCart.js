import express from "express";
import articleController from "../controllers/shoppingCart";
import ShoppingCartController from "../controllers/shoppingCart";

const router = express.Router();

router
  .route("/")
  .get(ShoppingCartController.getShoppingCart)
  .post(ShoppingCartController.insertShoppingCart);

router
  .route("/:id")
  .put(ShoppingCartController.updateShoppingCart)
  .delete(ShoppingCartController.deleteShoppingCart);

export default router;