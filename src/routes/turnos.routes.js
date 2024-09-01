import express from 'express';
import { crearTurnoController, obtenerTurnosController } from '../controllers/turnos.controller.js';
import { authTokenAndRole } from '../middlewares/auth.js';

const router = express.Router();

router.get('/', authTokenAndRole(['cliente', 'admin']), obtenerTurnosController);
router.post('/', authTokenAndRole(['cliente', 'admin']), crearTurnoController);
router.post('/', authTokenAndRole(['admin']), crearTurnosSemanales);

export default router;