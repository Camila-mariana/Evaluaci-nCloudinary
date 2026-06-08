import express from "express";
import controller from "../controllers/pacientesRegistro.js";


const router = express.Router();
router.route("/requestCode").post(controller.requestCode);
router.route("/verifyCode").post(controller.verifyCode);
router.route("/newPassword").post(controller.newPassword);

export default router;
