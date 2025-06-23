import express from "express";
import customersController from "../controllers/customerController.js";

const router = express.Router();

// Rutas CRUD para customers
router
  .route("/")
  .get(customersController.getcustomers)
  .post(customersController.createcustomers);

router
  .route("/:id")
  .put(customersController.updatecustomers)
  .delete(customersController.deletecustomers);

export default router;
