import { json } from "express";
import ExpedientesModel from "../models/expedientes.js";

const controller = {};
controller.getExpedientes = async (req, res) => {
  try {
    const Expedientes = await ExpedientesModel.find();
    res.status(200).json(Expedientes);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

controller.insertExpedientes = async (req, res) => {
  const { patient_id, diagnosis, medications, medicalNotes } = req.body;

  const newExpedientes = new ExpedientesModel({
    patient_id,
    diagnosis,
    medications,
    medicalNotes,
  });
  (await newExpedientes.save(), res.json({ message: "saved" }));
};

controller.updateExpedientes = async (req, res) => {
  try {
    let { patient_id, diagnosis, medications, medicalNotes } = req.body;

    const updateExpedientes = await ExpedientesModel.findByIdAndUpdate(
      req.params.id,
      {
        patient_id,
        diagnosis,
        medications,
        medicalNotes,
      },
      { new: true },
    );
    if (!updateExpedientes) {
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

controller.deleteExpedientes = async (req, res) => {
  try {
    const deleteExpedientes = await ExpedientesModel.findByIdAndDelete(
      req.params.id,
    );
    if (!deleteExpedientes) {
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
