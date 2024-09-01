import mongoose from 'mongoose';
import { model } from 'mongoose';

// Definir los tipos de atención
const TIPOS_ATENCION = [
  'Consulta de producto',
  'Soporte técnico',
  'Asesoría en compras',
  'Revisión de producto',
  'Consulta sobre garantía',
  'Atención post-venta',
  'Asesoría en productos exclusivos',
  // Puedes añadir más tipos si es necesario
];

// Definir los posibles estados para el turno
const ESTADOS_TURNO = [
  'pendiente', 
  'completado', 
  'cancelado', 
  'no asistido',
  'confirmado',
];

// Definir el esquema para el Turno
const turnoSchema = new mongoose.Schema({
  tipoAtencion: {
    type: String,
    enum: TIPOS_ATENCION,
    required: true
  },
  fecha: {
    type: Date,
    required: true
  },
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },
  estado: {
    type: String,
    enum: ESTADOS_TURNO,
    default: 'pendiente'
  },
  descripcion: {
    type: String, // Campo opcional para proporcionar detalles adicionales si es necesario
  },
  creadoEn: {
    type: Date,
    default: Date.now
  },
  actualizadoEn: {
    type: Date
  }
});

// Crear el modelo de Turno
const TurnoModel = model('Turno', turnoSchema);

export default TurnoModel;