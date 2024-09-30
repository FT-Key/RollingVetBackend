import { Router } from 'express';
import { postContactoController } from '../controllers/contacto.controller.js';

const router = Router();

router.post('/', postContactoController);

export default router;