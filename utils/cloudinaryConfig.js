import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { cloudinaryStorage } from "multer-storage-cloudinary";
import { config } from "../config.js";

cloudinary.config({
  cloud_name: config.cloudinary.cloudinary.name,
  api_key: config.cloudinary.cloudinary.api.key,
  api_secret: config.cloudinary.cloudinary.api.secret,
});

const storage = new cloudinaryStorage({
  cloudinary,
  params: {
    folder: "grupo 1B",
    alloweb_formats: ["jpg", "jpeg", "png", "gif"],
  },
});

const upload = multer({ storage });
export default upload;
