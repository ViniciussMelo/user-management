import { Router } from 'express';

import { jobController } from '../../modules/index.js';

const contractRoutes = Router();

contractRoutes.get('unpaid', jobController.getUnpaid);
contractRoutes.post('/:job_id/pay', jobController.createPayment);

export default contractRoutes;