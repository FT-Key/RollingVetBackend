import { Router } from 'express';
import { getUsuario, getUsuarios, postUsuario, putUsuario, deleteUsuario, agregarFotoPerfilController } from '../controllers/usuarios.controllers.js'
import upload from '../middlewares/multer.js';
import { authTokenAndRole } from '../middlewares/auth.js';

const router = Router();

/* GET */
router.get('/', getUsuarios);

/* GET con parametro */
router.get('/:idUsuario', getUsuario);

/* POST */
router.post('/', postUsuario);

/* PUT */
router.put('/:idUsuario', putUsuario);

/* DELETE */
router.delete('/:idUsuario', deleteUsuario);

/* SUBIR FOTO DE PERFIL*/
router.post('/agregarFotoPerfil/:idUsuario', upload.single('image'), agregarFotoPerfilController);

export default router;