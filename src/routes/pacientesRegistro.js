import express from "express";
import controller from "../controllers/pacientesRegistro.js";
import upload from "../../utils/cloudinaryConfig.js";

const router = express.Router();
router.route("/").post(upload.single("image").controller.post);
router.route("/verify").post(controller.verify);

export default router;
