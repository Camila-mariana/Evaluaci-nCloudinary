import { json } from "express";
import EquipoModel from "../models/equipo.js";
import { v2 as cloudinary } from "cloudinary";

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

controller.insertequipo = async (req, res) => {
  const {
    equipmentName,
    description,
    brand,
    model,
    purchaseDate,
    maintenanceDate,
    location,
    status,
    isAvailable,
  } = req.body;

  const newEquipo = new EquipoModel({
    equipmentName,
    description,
    brand,
    model,
    purchaseDate,
    maintenanceDate,
    location,
    image: req.file.path,
    public_id: req.file.filename,
    status,
    isAvailable,
  });
  (await newEquipo.save(), res.json({ message: "saved" }));
};

controller.updateEquipo = async (req, res) => {
  try {
    const {
      equipmentName,
      description,
      brand,
      model,
      purchaseDate,
      maintenanceDate,
      location,
      status,
      isAvailable,
    } = req.body;

    const equipoFound = await EquipoModel.findById(req.params.id);

    const updateEquipo = {
      equipmentName,
      description,
      brand,
      model,
      purchaseDate,
      maintenanceDate,
      location,
      status,
      isAvailable,
    };
    if (req.file) {
      await cloudinary.uploader.destroy(equipoFound.public_id);
      updateEquipo.image = req.file.path;
      updateEquipo.image = req.file.filename;
    }
    await EquipoModel.findByIdAndUpdate(req.params.id, updateEquipo, {
      new: true,
    });
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
    const equipoFound = await EquipoModel.findById(req.params.id);
    await cloudinary.uploader.destroy(equipoFound.public_id);
    const deleteEquipo = await EquipoModel.findByIdAndDelete(req.params.id);
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
