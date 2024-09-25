import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const PLANES = ["Sin plan", "Básico", "Completo", "Premium"];

const PlanSchema = new Schema({
  nombre: { type: String, enum: PLANES, required: true },
  descripcion: { type: String, required: true },
  precio: { type: Number, required: true }, // Precio del plan
  imagenUrl: { type: String },
});

const Plan = model("Plan", PlanSchema);

export default Plan;