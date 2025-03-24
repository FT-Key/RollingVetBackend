import { Schema, model as _model } from 'mongoose';

const productoSchema = new Schema({
  id: { type: Number, required: true, unique: true },
  nombre: { type: String, required: true },
  precio: { type: Number, required: true },
  descripcion: { type: String, required: true },
  categoria: { type: String, required: true },
  cantidadEnStock: { type: Number, required: true },
  fechaDeIngreso: { type: Date, required: true },
  proveedor: { type: String, required: true },
  codigoDeBarras: { type: String, required: true, unique: true },
  imagenUrl: { type: String, required: true },
  imagenesUrls: { type: [String], default: [] },
  calificaciones: { type: Number, required: true, min: 0, max: 5 },
  resenias: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
  garantia: { type: String, required: true },
  descuento: { type: Number, required: true, min: 0, max: 100 },
  bloqueado: { type: Boolean, required: true }
});

const Producto = _model('Producto', productoSchema);

export default Producto;