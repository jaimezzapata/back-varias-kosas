import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger.js';
import apiRoutes from './transport/routes/index.js';
import { errorMiddleware } from './transport/middlewares/error.middleware.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'varias-kosas-api',
    docs: '/api/docs',
    health: '/api/health',
  });
});

app.get('/api/docs.json', (_req, res) => {
  res.status(200).json(swaggerSpec);
});
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api', apiRoutes);

app.use((_req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

app.use(errorMiddleware);

export default app;
