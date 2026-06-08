import express from "express"
import controller from "../controllers/citas.js"

const router = express.Router();
router.route("/")
.get(controller.getCitas)
.post(controller.insertCitas);
router.route("/id")
.put(controller.updateCitas)
.delete(controller.deletecitas)

export default router;