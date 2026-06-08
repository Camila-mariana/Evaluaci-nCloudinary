import { json } from "express";
import EquipoModel from "../models/equipo.js";

const controller = {};
controller.getEquipo = async (req, res) => {
  try {
    const Equipo = await EquipoModel.find();
    res.status(200).json(Equipo);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

controller.updateEquipo = async (req, res) => {
  try {
    let {
      equipmentName,
      description,
      brand,
      model,
      purchaseDate,
      maintenanceDate,
      location,
      image,
      status,
      isAvailable,
    } = req.body;

    const updateEquipo = await EquipoModel.findByIdAndUpdate(
      req.params.id,
      {
        equipmentName,
        description,
        brand,
        model,
        purchaseDate,
        maintenanceDate,
        location,
        image,
        status,
        isAvailable,
      },
      { new: true },
    );
    if (!updateEquipo) {
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

controller.deleteEquipo = async (req, res) => {
  try {
    const deleteEquipo = EquipoModel.findByIdAndDelete(req.params.id);
    if (!deleteEquipo) {
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
