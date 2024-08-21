import { Schema, model as _model } from 'mongoose';

const reviewSchema = new Schema({
  user: { type: String, required: true },
  comment: { type: String, required: true },
  rating: { type: Number, required: true, min: 0, max: 5 }
});

const productoSchema = new Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  stock: { type: Number, required: true },
  brand: { type: String, required: true },
  model: { type: String, required: true },
  imageUrl: { type: String, required: true },
  imageUrls: [{ type: String, default: [''] }], // Agregar un array de strings para almacenar enlaces de imágenes anteriores
  ratings: { type: Number, required: true, min: 0, max: 5 },
  reviews: [reviewSchema],
  warranty: { type: String, required: true },
  releaseDate: { type: Date, required: true },
  discount: { type: String, require: true, validate: { validator: v => /^([0-9]|[1-9][0-9]|100)(\.\d{1,2})?%?$/.test(v), message: props => `${props.value} no es un descuento válido.` } },
  blocked: { type: Boolean, required: true }
});

const Producto = _model('Producto', productoSchema);

export default Producto;