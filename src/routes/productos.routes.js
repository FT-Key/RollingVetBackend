import { Router } from 'express';
import { getProductos, getProducto, postProducto, putProducto, deleteProducto, agregarImagenProductoController } from '../controllers/productos.controllers.js'
import upload from '../middlewares/multer.js';

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

/* SUBIR IMAGEN */
router.post('/agregarImagen/:idProducto', upload.single('image'), agregarImagenProductoController);

export default router;