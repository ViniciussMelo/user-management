import { Router } from 'express';

import { getProfile } from '../middleware/get-profile.middleware.js';
import { jobController } from '../../modules/index.js';

const jobRoutes = Router();

jobRoutes.get('/unpaid', getProfile, jobController.getUnpaid.bind(jobController));
jobRoutes.post('/:job_id/pay', getProfile, jobController.makePayment.bind(jobController));

export default jobRoutes;