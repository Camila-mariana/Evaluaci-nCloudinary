import express from "express"
import controller from "../controllers/equipo.js"
import upload from "../../utils/cloudinaryConfig.js";

const router = express.Router();
router.route("/")
.get(controller.getEquipo)
.post(upload.single("image").controller.insertequipo)
router.route("/id")
.put(upload.single("image").controller.updateEquipo)
.delete(controller.deleteEquipo)

export default router;