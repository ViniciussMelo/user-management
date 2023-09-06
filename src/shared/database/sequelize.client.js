import { Sequelize } from 'sequelize';

import { NODE_ENV } from '../../configs/environment/environment.config.js';
import { loadJSON } from '../utils/load-json.util.js';

const config = loadJSON('../../configs/database/database.config.json');

export const sequelize = new Sequelize({
  dialect: config[NODE_ENV].dialect,
  storage: config[NODE_ENV].storage,
  logging: config[NODE_ENV].logging,
});
