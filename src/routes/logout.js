import express from "express"
import controller from "../controllers/logout.js";

const router = express.Router();
router.route("/").post(controller.logout);

export default router;
