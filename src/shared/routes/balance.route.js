import { Router } from 'express';

import { balanceController } from '../../modules/index.js';

const balanceRoutes = Router();

balanceRoutes.get('/deposit/:userId', balanceController.createDeposit);

export default balanceRoutes;