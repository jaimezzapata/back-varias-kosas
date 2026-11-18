import { Router } from 'express';
import { publicationController } from '../../controllers/publication.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { validateBody } from '../middlewares/validate.middleware.js';
import {
  createPublicationSchema,
  updatePublicationSchema,
} from '../validators/publication.validator.js';

const router = Router();

router.get('/', publicationController.list);
router.get('/mine', authMiddleware, publicationController.listMine);
router.get('/:id', publicationController.getById);
router.post(
  '/',
  authMiddleware,
  validateBody(createPublicationSchema),
  publicationController.create
);
router.put(
  '/:id',
  authMiddleware,
  validateBody(updatePublicationSchema),
  publicationController.update
);
router.patch(
  '/:id',
  authMiddleware,
  validateBody(updatePublicationSchema),
  publicationController.update
);
router.delete('/:id', authMiddleware, publicationController.remove);

export default router;
