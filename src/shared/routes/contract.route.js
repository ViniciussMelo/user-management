import { Router } from 'express';

import { contractController } from '../../modules/index.js';

const contractRoutes = Router();

contractRoutes.get('/', contractController.index);
contractRoutes.get('/:id', contractController.getById);

export default contractRoutes;