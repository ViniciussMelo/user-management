import { Router } from 'express';

import { getProfile } from '../middleware/get-profile.middleware.js';
import { jobController } from '../../modules/index.js';

const contractRoutes = Router();

contractRoutes.get('/unpaid', getProfile, jobController.getUnpaid.bind(jobController));
contractRoutes.post('/:job_id/pay', jobController.createPayment.bind(jobController));

export default contractRoutes;