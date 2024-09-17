import express from 'express';
import { crearTurnosSemanalesController, obtenerTurnosController, solicitarTurnoController, listaTurnosController, cancelarTurnoController, modificarTurnoController } from '../controllers/turnos.controller.js';
/* import { crearTurnoController, obtenerTurnosController } from '../controllers/turnos.controller.js'; */
import { authTokenAndRole } from '../middlewares/auth.js';
import { paginationMiddleware } from '../utils/pagination.js';

const router = express.Router();

/* router.get('/', authTokenAndRole(['cliente', 'admin']), obtenerTurnosController);
router.post('/', authTokenAndRole(['cliente', 'admin']), crearTurnoController); */

router.get('/obtener', authTokenAndRole(['cliente', 'admin']), paginationMiddleware, obtenerTurnosController);
router.get('/obtener/:fecha', authTokenAndRole(['cliente', 'admin']), obtenerTurnosController);
router.get('/listaTurnos', authTokenAndRole(['cliente', 'admin']), listaTurnosController);
router.post('/solicitarTurno', authTokenAndRole(['cliente', 'admin']), solicitarTurnoController);
router.post('/crearTurnosSemanales', authTokenAndRole(['admin']), crearTurnosSemanalesController);
router.put('/cancelarTurno', authTokenAndRole(['cliente', 'admin']), cancelarTurnoController);
router.put('/modificarTurno/:turnoId', authTokenAndRole(['cliente', 'admin']), modificarTurnoController);


export default router;