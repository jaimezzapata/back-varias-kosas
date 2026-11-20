import { Router } from 'express';
import { authController } from '../../controllers/auth.controller.js';
import { validateBody } from '../middlewares/validate.middleware.js';
import { registerSchema } from '../validators/auth.validator.js';

const router = Router();

router.post('/register', validateBody(registerSchema), authController.register);
router.get('/login', authController.login);
router.get('/me', authController.me);

export default router;
