import express from'express';
import {
  addProductToCart,
  removeProductFromCart,
  getCart,
  addProductToFav,
  removeProductFromFav,
  getFav
} from'../controllers/favncart.controllers.js';
import { authTokenAndRole } from'../middlewares/auth.js';

const router = express.Router();

// Rutas para el carrito
router.post('/carrito/agregar/:idProducto', authTokenAndRole('cliente'), addProductToCart);
router.delete('/carrito/quitar/:idProducto', authTokenAndRole('cliente'), removeProductFromCart);
router.get('/carrito', authTokenAndRole('cliente'), getCart);

// Rutas para los favoritos
router.post('/fav/agregar/:idProducto', authTokenAndRole('cliente'), addProductToFav);
router.delete('/fav/quitar/:idProducto', authTokenAndRole('cliente'), removeProductFromFav);
router.get('/fav', authTokenAndRole('cliente'), getFav);

export default router;