import express from "express"
import controller from "../controllers/Expedientes.js"

const router = express.Router();
router.route("/")
.get(controller.getExpedientes)
.post(controller.insertExpedientes)
router.route("/id")
.put(controller.updateExpedientes)
.delete(controller.deleteExpedientes)

export default router;