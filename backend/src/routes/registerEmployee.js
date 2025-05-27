import express from "express";
const router = express.Router();

import registerEmployeeController from "../controllers/registerEmployeeController.js";

router.route("/").post(registerEmployeeController.register);

export default router;
