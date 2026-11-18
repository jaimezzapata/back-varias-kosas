import { Router } from 'express';
import authRoutes from './auth.routes.js';
import publicationRoutes from './publication.routes.js';

const router = Router();

router.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok', service: 'varias-kosas-api' });
});

router.use('/auth', authRoutes);
router.use('/publications', publicationRoutes);

export default router;
