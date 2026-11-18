import { Router } from 'express';
import { prisma } from '../../config/prisma.js';
import authRoutes from './auth.routes.js';
import publicationRoutes from './publication.routes.js';

const router = Router();

router.get('/health', async (_req, res, next) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.status(200).json({
      status: 'ok',
      database: 'connected',
      service: 'varias-kosas-api',
    });
  } catch (error) {
    next(error);
  }
});

router.use('/auth', authRoutes);
router.use('/publications', publicationRoutes);

export default router;
