import express from 'express';
import {
  addProductToCartController,
  removeProductFromCartController,
  getCartController,
  addProductToFavController,
  removeProductFromFavController,
  getFavController
} from '../controllers/favncart.controllers.js';
import { authTokenAndRole } from '../middlewares/auth.js';

const router = express.Router();

// Rutas para el carrito
router.post('/carrito/agregar/:idProducto', authTokenAndRole('cliente'), addProductToCartController);
router.delete('/carrito/quitar/:idProducto', authTokenAndRole('cliente'), removeProductFromCartController);
router.get('/carrito', authTokenAndRole('cliente'), getCartController);

// Rutas para los favoritos
router.post('/fav/agregar/:idProducto', authTokenAndRole('cliente'), addProductToFavController);
router.delete('/fav/quitar/:idProducto', authTokenAndRole('cliente'), removeProductFromFavController);
router.get('/fav', authTokenAndRole('cliente'), getFavController);

export default router;