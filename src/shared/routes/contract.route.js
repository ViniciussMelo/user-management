import { Router } from 'express';

import { contractController } from '../../modules/index.js';
import { getProfile } from '../middleware/getProfile.js';

const contractRoutes = Router();

contractRoutes.get('/', contractController.index);
contractRoutes.get('/:id', getProfile, contractController.getById);

export default contractRoutes;