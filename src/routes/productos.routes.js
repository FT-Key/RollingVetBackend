import { Router } from 'express';
import { getProductos, getProducto, postProducto, putProducto, deleteProducto } from '../controllers/productos.controllers.js'

const router = Router();

/* GET */
router.get('/', getProductos);

/* GET con parametro */
router.get('/:idProducto', getProducto);

/* POST */
router.post('/', postProducto);

/* PUT */
router.put('/:idProducto', putProducto);

/* DELETE */
router.delete('/:idProducto', deleteProducto);

export default router;