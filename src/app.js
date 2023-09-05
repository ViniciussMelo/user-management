import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';

import { sequelize } from './shared/models/model.js';
import AppError from './shared/errors/app.error.js';
import router from './shared/routes/index.js';

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.set('sequelize', sequelize);
app.set('models', sequelize.models);

app.use(router);

app.use(
  (err, request, response, next) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }

    return response.status(500).json({
      status: "error",
      message: `Internal server error - ${err.message}`,
    });
  }
);

export default app;