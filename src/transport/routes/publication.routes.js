import { Router } from 'express';
import { publicationController } from '../../controllers/publication.controller.js';
import { validateBody } from '../middlewares/validate.middleware.js';
import {
  createPublicationSchema,
  updatePublicationSchema,
} from '../validators/publication.validator.js';

const router = Router();

router.get('/', publicationController.list);
router.get('/mine', publicationController.listMine);
router.get('/:id', publicationController.getById);
router.post('/', validateBody(createPublicationSchema), publicationController.create);
router.put('/:id', validateBody(updatePublicationSchema), publicationController.update);
router.patch('/:id', validateBody(updatePublicationSchema), publicationController.update);
router.delete('/:id', publicationController.remove);

export default router;
