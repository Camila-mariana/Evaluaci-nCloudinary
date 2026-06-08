import loginModelo from "../models/pacientes.js";
import controller from "../controllers/pacientes.js";
import { config } from "../../config.js";
import jsonwebtoken from "jsonwebtoken";
import bcryptjs from "bcryptjs";

const loginPacientes = {};
loginPacientes.login = async (req, res) => {
  const { email, password } = req.body;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email || !emailRegex.test(email)) {
    return res.status(400).json({
      message: "invalid email",
    });
  }
  try {
    const pacientesFound = await loginModelo.findOne({email});
    if(pacientesFound.loginAttemps = (pacientesFound.loginAttemps || 0) +1);
    
    if(pacientesFound.loginAttemps >= 5 ){
        pacientesFound.timeOut = Date.now () + 5 * 60 * 100;
        pacientesFound.loginAttemps = 0;
        await pacientesFound.save ();
         return res.status(404).json({
       message: "intentos fallidos",
    });
    }
    
    pacientesFound.loginAttemps = 0;
    pacientesFound.timeOut = null;
     const token = jsonwebtoken.sign(
      {id:pacientesFound_id, userType: "paciente"},
      config.jwt.secret,
      {expiresIn:"30d"}
     );

     res.cookie("authCookie", token)
     return res.status(200).json({ message: "entraste yei" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export default loginPacientes;