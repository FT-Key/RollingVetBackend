import { Router } from 'express';
import { getProductosController, getProductoController, postProductoController, putProductoController, deleteProductoController, agregarImagenProductoController } from '../controllers/productos.controllers.js'
import upload from '../middlewares/multer.js';
import { authTokenAndRole } from '../middlewares/auth.js';
import { paginationMiddleware } from '../utils/pagination.js';

const router = Router();

/* GET */
router.get('/', paginationMiddleware, getProductosController);

/* GET con parametro */
router.get('/:idProducto', getProductoController);

/* POST */
router.post('/', authTokenAndRole('admin'), postProductoController);

/* PUT */
router.put('/:idProducto', authTokenAndRole('admin'), putProductoController);

/* DELETE */
router.delete('/:idProducto', authTokenAndRole('admin'), deleteProductoController);

/* SUBIR IMAGEN */
router.post('/agregarImagen/:idProducto', authTokenAndRole('admin'), upload.single('image'), agregarImagenProductoController);

export default router;