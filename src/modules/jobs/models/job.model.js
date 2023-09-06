import { Sequelize } from "sequelize";

import { sequelize } from '../../../shared/database/sequelize.client.js';

export const Job = sequelize.define('Job', {
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  price:{
    type: Sequelize.DECIMAL(12,2),
    allowNull: false
  },
  paid: {
    type: Sequelize.BOOLEAN,
    default:false
  },
  paymentDate:{
    type: Sequelize.DATE
  }
});