import { Schema, model as _model } from 'mongoose';

const reviewSchema = new Schema({
  usuario: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true }, // Referencia a Usuario
  comentario: { type: String, required: true },
  calificacion: { type: Number, required: true, min: 0, max: 5 }
});

const Review = _model('Review', reviewSchema);

export default Review;
