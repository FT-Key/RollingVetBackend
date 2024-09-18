import { Router } from 'express';
import { getUsuario, getUsuarios, postUsuario, putUsuario, deleteUsuario, agregarFotoPerfilController } from '../controllers/usuarios.controllers.js'
import upload from '../middlewares/multer.js';
import { authTokenAndRole } from '../middlewares/auth.js';
import { paginationMiddleware } from '../utils/pagination.js';

const router = Router();

/* GET */
router.get('/', authTokenAndRole(['admin']), paginationMiddleware, getUsuarios);

/* GET con parametro */
router.get('/:idUsuario', authTokenAndRole(['admin']), getUsuario);

/* POST */
router.post('/', postUsuario);

/* PUT */
router.put('/:idUsuario', putUsuario);

/* DELETE */
router.delete('/:idUsuario', deleteUsuario);

/* SUBIR FOTO DE PERFIL*/
router.post('/agregarFotoPerfil/:idUsuario', upload.single('image'), agregarFotoPerfilController);

export default router;