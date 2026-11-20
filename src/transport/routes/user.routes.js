import { Router } from 'express';
import { userController } from '../../controllers/user.controller.js';

const router = Router();

router.get('/', userController.list);
router.get('/:id', userController.getById);

export default router;
