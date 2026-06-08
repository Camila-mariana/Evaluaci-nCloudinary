import loginModelo from "../models/pacientes.js";
import controller from "../controllers/pacientes.js";
import { config } from "../../config.js";
import jsonwebtoken from "jsonwebtoken";
import bcryptjs from "bcryptjs";

const loginPacientes = {};
log