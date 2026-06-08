import { json } from "express";
import citasModel from "../models/citas.js";

const controller = {};
controller.getCitas = async (req, res) => {
  try {
    const citas = await citasModel.find();
    res.status(200).json(citas);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

controller.insertCitas = async (req, res) => {
  const { patient_id, specialty, appoimentDate, reason, status, observations } =
    req.body;
  const newCita = new citasModel({
    patient_id,
    specialty,
    appoimentDate,
    reason,
    status,
    observations,
  });
  (await newCita.save(), res.json({ message: "saved" }));
};

controller.updateCitas = async (req, res) => {
  try {
    let { patient_id, specialty, appoimentDate, reason, status, observations } =
      req.body;

    const updateCitas = await citasModel.findByIdAndUpdate(
      req.params.id,
      {
        patient_id,
        specialty,
        appoimentDate,
        reason,
        status,
        observations,
      },
      { new: true },
    );
    if (!updateCitas) {
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

controller.deletecitas = async (req, res) => {
  try {
    const deletecitas = await citasModel.findByIdAndDelete(req.params.id);
    if (!deletecitas) {
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
