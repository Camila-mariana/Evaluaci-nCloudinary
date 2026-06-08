import controller from "../controllers/loginPacientes.js";
import express from "express"

const router = express.Router();
router.route("/").post(controller.login);

export default router;


