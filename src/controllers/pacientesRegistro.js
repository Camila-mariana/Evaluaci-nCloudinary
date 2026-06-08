import nodemailer from "nodemailer";
import crypto from "crypto";
import jsonwebtoken from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import model from "../models/pacientes.js"
import { config } from "../../config.js";
import {v2 as Cloudinary} from "cloudinary";

const controller = {
  post: async (req, res) => {
    const {
      name,
      lastName,
      email,
      password,
      birthDate,
      phone,
      address,
      bloodType,
      phoneEmergencyContacts,
      isVerified,
      loginAttemps,
      timeOut,
    } = req.body;
    try {
      const exists = await model.findOne({ email });
      if (exists) {
        return res.status(400).json({
          message: "ya existe este paciente",
        });
      }
      const hash = await bcryptjs.hash(password, 10);
      const random = crypto.randomBytes(3).toString("hex");
      const token = jsonwebtoken.sign(
        {
          random,
          name,
          lastName,
          email,
          password: hash,
          birthDate,
          phone,
          address,
          bloodType,
          phoneEmergencyContacts,
          profilePhoto: req.file.path,
          public_id: req.file.filename,
          isVerified,
          loginAttemps,
          timeOut,
        },
        config.jwt.secret,
        {
          expiresIn: "15m",
        },
      );
      res.cookie("cookie", token, {
        maxAge: 15 * 60 * 1000,
      });
      const transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: config.email.email,
          pass: config.email.password,
        },
      });
      transport.sendMail(
        {
          from: config.email.email,
          to: email,
          subject: "Verificación de correo",
          text: `para verficar, use este codigo: ${random} expira en 15 minutos`,
        },
        (error, info) => {
          if (error)
            return res.status(500).json({
              message: "Error sendind email",
            });
          return res.status(200).json({
            message: "email sent",
          });
        },
      );
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },

  verify: async (req, res) => {
    try {
      const { code } = req.body;
      const decoded = jsonwebtoken.verify(
        req.cookies.cookie,
        config.jwt.secret,
      );
      const {
        random,
        name,
        lastName,
        email,
        password,
        birthDate,
        phone,
        address,
        bloodType,
        phoneEmergencyContacts,
        profilePhoto,
        public_id,
        loginAttemps,
        timeOut,
      } = decoded;
      if (code !== random)
        return res.status(400).json({
          message: "invalid code",
        });
      const pacientes = newModel({
        name,
        lastName,
        email,
        password,
        birthDate,
        phone,
        address,
        bloodType,
        phoneEmergencyContacts,
        profilePhoto,
        public_id,
        isVerified: true,
        loginAttemps,
        timeOut,
      });
      await pacientes.save();
      res.clearCookie("cookie");
      return res.status(200).json({
        message: "saved",
      });
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },
};

export default controller;
