import { Schema, model } from "mongoose";
const citasSchema = new Schema(
  {
    patient_id: {
      type: Schema.Types.ObjectId,
      ref: "pacientes",
    },
    specialty: {
      type: Schema.Types.ObjectId,
      ref: "especialidades",
    },
    appoimentDate: {
      type: Date,
    },
    reason: {
      type: String,
    },
    status: {
      type: String,
    },
    observations :{
      type: String,
    },
  },
  {
    timestamps: true,
    strict: false,
  },
);

export default model("citas", citasSchema);
