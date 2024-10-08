import mongoose from "mongoose";
import { Schema, model } from "mongoose";

// Constantes
const ESTADOS_ANIMAL = ["Mascota", "En Adopción"];
const ESPECIES = ["Perro", "Gato", "Ave", "Conejo", "Reptil", "Otro"];
const VACUNAS = [
  "Rabia",
  "Parvovirus",
  "Distemper",
  "Hepatitis",
  "Leptospirosis",
  "Bordetella",
];
const GENEROS = [
  "Macho",
  "Hembra",
];

// Esquema de vacunas
const VacunasSchema = new Schema({
  nombre: { type: String, required: true, enum: VACUNAS },
  fecha: { type: Date, required: true },
});

// Esquema de animales
const AnimalSchema = new Schema({
  duenio: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario" }, // Relación opcional con un usuario
  tipo: { type: String, enum: ESPECIES, required: true }, // Tipo de animal
  raza: { type: String },
  nombre: { type: String, required: true },
  edad: { type: Number, required: true }, // Edad en años o meses según el caso
  genero: { type: String, required: true, enum: GENEROS },
  descripcion: { type: String }, // Información adicional
  vacunas: { type: [VacunasSchema], default: [] }, // Lista de vacunas aplicadas
  plan: { type: mongoose.Schema.Types.ObjectId, ref: "Plan", default: null }, // Referencia a un plan
  estado: { type: String, enum: ESTADOS_ANIMAL, required: true }, // Mascota o en adopción
  fotoUrl: { type: String, default: "https://via.placeholder.com/150" }, // URL de la foto del animal
  ultimaVisitaVeterinaria: { type: Date }, // Fecha de la última visita al veterinario
  esterilizado: { type: Boolean, default: false }, // Si el animal está esterilizado
  peso: { type: Number }, // Peso del animal en kg
  historialMedico: { type: [String], default: [] }, // Lista de eventos médicos importantes
  creadoPor: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario", default: null },  // Referencia opcional a Usuario
  creadoEn: { type: Date, default: Date.now },
  actualizadoEn: { type: Date },
});

const Animal = model("Animal", AnimalSchema);

export default Animal;