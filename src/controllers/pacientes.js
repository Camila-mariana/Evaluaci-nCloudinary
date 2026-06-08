import { json } from "express";
import pacientesModel from "../models/pacientes.js";
import { v2 as cloudinary } from "cloudinary";

const controller = {};
controller.getPacientes = async (req, res) => {
  try {
    const pacientes = await pacientesModel.find();
    res.status(200).json(pacientes);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

controller.updatePaciente = async (req, res) => {
  try {
    let {
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
      isVerified,
      loginAttemps,
      timeOut,
    } = req.body;
    name = name?.trim();
    email = email?.trim();

    if (!name || !email || !password) {
      return res.status(400).json({ message: "fields required" });
    }
    if (birthDate > newDate() || birthDate < newDate("1901-01-01")) {
      return res.status(400).json({ message: "invalid" });
    }

    const updatePaciente = await pacientesModel.findByIdAndUpdate(
      req.params.id,
      {
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
        isVerified,
        loginAttemps,
        timeOut,
      },
      { new: true },
    );
    if (!updatePaciente) {
      return res.status(400).json({ message: "not found" });
    }
    return res.status(200).json({ message: "updated" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

controller.deletePacientes = async (req, res) => {
  try {
    const deletePacientes = pacientesModel.findByIdAndDelete(req.params.id);
    if (!deletePacientes) {
      return res.status(400).json({ message: "not found" });
    }
    return res.status(200).json({ message: "deleted" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export default controller;
