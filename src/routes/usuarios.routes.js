import { Router } from 'express';
import { getUsuario, getUsuarios, postUsuario, putUsuario, deleteUsuario } from '../controllers/usuarios.controllers.js'

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

export default router;