import express from "express";
import payController from "../controllers/payController";
 
const router = express.Router();
 
router
  .route("/")
  .get(payController.getPay)
  .post(payController.insertPay);
 
router
  .route("/:id")
  .put(payController.updatePay)
  .delete(payController.deletePay);
 
export default router;