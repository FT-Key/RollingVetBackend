import mongoose from 'mongoose';

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
  'libre',
  'pendiente',
  'completado',
  'cancelado',
  'no asistido',
  'confirmado',
  'caducado'
];

// Definir los tipos de modalidad
const MODALIDADES = ['presencial', 'online'];

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
    default: 'libre'
  },
  modalidad: {
    type: String,
    enum: MODALIDADES,
    default: 'online',
    required: true
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

// Definir el esquema FechaTurno
const fechaTurnoSchema = new mongoose.Schema({
  fecha: {
    type: Date,
    unique: true,  // Para asegurar que no se repita la fecha
    required: true
  },
  creador: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true  // El usuario que creó la fecha y los turnos
  },
  turnos: [turnoSchema],  // Array de turnos embebidos
  creadoEn: {
    type: Date,
    default: Date.now
  },
  actualizadoEn: {
    type: Date
  }
});

// Crear el modelo FechaTurno
const FechaTurnoModel = mongoose.model('FechaTurno', fechaTurnoSchema);

export default FechaTurnoModel;