import jsonwebtoken from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import crypto from "crypto";
import nodemailer from "nodemailer";
import { config } from "../../config.js";
import PacientesModelo from "../models/pacientes.js";

const recovery = {};

recovery.requestCode = async (req, res) => {
  try {
    const { email } = req.body;
    const UserFound = await PacientesModelo.findOne({ email });

    if (!UserFound) {
      return res.status(404).json({ message: "not found" });
    }
    const randomCode = crypto.randomBytes(3).toString("hex");
    const token = jsonwebtoken.sign(
      { email, randomCode, userType: "paciente", verified: false },
      config.jwt.secret,
      { expiresIn: "15m" },
    );

    res.cookie("recoveryCookie", token, { maxAge: 15 * 60 * 1000 });

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: config.email.email,
        pass: config.email.password,
      },
    });

    const mailOptions = {
      from: config.email.user_email,
      to: email,
      subject: "codigo de recuperación",
      text: `para verficar, use este codigo: ${random} expira en 15 minutos`,
    };
    transport.sendMail(mailOptions, (err, info) => {
      if (err) {
        return res.status(500).send("Error al enviar");
      }
      return res.status(200).send("Codigo enviado");
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

recovery.verifyCode = async (req, res) => {
  try {
    const { code } = req.body;
    const token = req.cookies.recoveryCookie;
    const decoded = jsonwebtoken.verify(token, config.jwt.secret);

    if (code !== decoded.randomCode) {
      return res.status(400).json({ message: "No es valido" });
    }
    const newToken = jsonwebtoken.sign(
      { email: decoded.email, userType: "paciente", verified: true },
      config.jwt.secret,
      { expiresIn: "15m" },
    );


  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
