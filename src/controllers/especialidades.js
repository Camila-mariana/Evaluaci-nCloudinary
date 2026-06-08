import { json } from "express";
import EspecialidadesModel from "../models/especialidades.js";

const controller = {};
controller.getEspecialidades = async (req, res) => {
  try {
    const Especialidades = await EspecialidadesModel.find();
    res.status(200).json(Especialidades);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

controller.updateEspecialidades = async (req, res) => {
  try {
    let { specialtyName, description, isAvailable } = req.body;

    const updateEspecialidades = await EspecialidadesModel.findByIdAndUpdate(
      req.params.id,
      {
        specialtyName,
        description,
        isAvailable,
      },
      { new: true },
    );
    if (!updateEspecialidades) {
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

controller.deleteEspecialidades = async (req, res) => {
  try {
    const deleteEspecialidades = EspecialidadesModel.findByIdAndDelete(
      req.params.id,
    );
    if (!deleteEspecialidades) {
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
