import mongoose from "mongoose";
import { model, Schema } from "mongoose";

const CartSchema = new mongoose.Schema({
  idUsuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true,
  },
  productos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Producto', // Referencia a la colección de productos
    }
  ],
});

const CartModel = model('cart', CartSchema);

export default CartModel;