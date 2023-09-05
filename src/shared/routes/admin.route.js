import { Router } from 'express';

import { adminController } from '../../modules/index.js';

const adminRoutes = Router();

adminRoutes.get('/best-profession', adminController.getBestProfession);
adminRoutes.get('/best-clients', adminController.getBestClients);

export default adminRoutes;