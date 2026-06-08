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

controller.updatePacientes = async (req, res) => {
  try {
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

    const PacientesFound = await PacientesModel.findById(req.params.id);

    const updatePacientes = {
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
    };
    if (req.file) {
      await cloudinary.uploader.destroy(PacientesFound.public_id);
      updatePacientes.profilePhoto = req.file.path;
      updatePacientes.profilePhoto = req.file.filename;
    }
    await PacientesModel.findByIdAndUpdate(req.params.id, updatePacientes, {
      new: true,
    });
    if (!updatePacientes) {
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
    const PacientesFound = await PacientesModel.findById(req.params.id);
    await cloudinary.uploader.destroy(PacientesFound.public_id);
    const deletePacientes = await PacientesModel.findByIdAndDelete(
      req.params.id,
    );
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
