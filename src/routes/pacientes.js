import express from "express"
import controller from "../controllers/pacientes.js"

const router = express.Router();
router.route("/")
.get(controller.getPacientes)
router.route("/id")
.put(controller.updatePacientes)
.delete(controller.deletePacientes)

export default router;