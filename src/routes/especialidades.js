import express from "express"
import controller from "../controllers/Especialidades.js"

const router = express.Router();
router.route("/")
.get(controller.getEspecialidades)
.post(controller.insertEspecialidades)
router.route("/id")
.put(controller.updateEspecialidades)
.delete(controller.deleteEspecialidades)

export default router;