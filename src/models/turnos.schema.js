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
];

// Definir los posibles estados para el turno
const ESTADOS_TURNO = [
  'pendiente', 
  'completado', 
  'cancelado', 
  'no asistido',
  'confirmado',
];

// Definir el subdocumento Turno
const turnoSchema = new mongoose.Schema({
  hora: {
    type: String,  // Ejemplo: '09:00'
    required: true
  },
  tipoAtencion: {
    type: String,
    enum: TIPOS_ATENCION,
    required: true
  },
  estado: {
    type: String,
    enum: ESTADOS_TURNO,
    default: 'pendiente'
  },
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: false  // Será null hasta que el cliente lo reserve
  },
  descripcion: {
    type: String, // Campo opcional para proporcionar detalles adicionales si es necesario
  }
});

// Crear el modelo de Turno
const TurnoModel = model('Turno', turnoSchema);

export default TurnoModel;