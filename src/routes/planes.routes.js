import { Router } from 'express';
import {
  getPlanesController,
  getPlanController,
  postPlanController,
  putPlanController,
  deletePlanController,
  comprarPlanController
} from '../controllers/planes.controllers.js';
import { authTokenAndRole } from '../middlewares/auth.js';
import { paginationMiddleware } from '../utils/pagination.js';
import PlanModel from '../models/plan.schema.js'; // Modelo de Plan

const router = Router();

/* GET todos los planes con paginación */
router.get('/', paginationMiddleware, getPlanesController);

/* GET plan específico */
router.get('/:idPlan', getPlanController);

/* POST crear un plan (solo admin) */
router.post('/', authTokenAndRole('admin'), postPlanController);

router.put('/comprarPlan', authTokenAndRole(['cliente', 'admin']), comprarPlanController);

/* PUT actualizar un plan (solo admin) */
router.put('/:idPlan', authTokenAndRole('admin'), putPlanController);

/* DELETE eliminar un plan (solo admin) */
router.delete('/:idPlan', authTokenAndRole('admin'), deletePlanController);

export default router;