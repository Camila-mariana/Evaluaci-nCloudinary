import { Schema, model } from "mongoose";
const especialidadesSchema = new Schema(
  {
    specialtyName: {
      type: String,
    },
    description: {
      type: String,
    },
    isAvailable: {
      type: String,
    },
  },
  {
    timestamps: true,
    strict: false,
  },
);

export default model("especialidades", especialidadesSchema);
