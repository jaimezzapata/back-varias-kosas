import { authService } from '../services/auth.service.js';
import { AppError } from '../utils/appError.js';

export const authController = {
  async register(req, res, next) {
    try {
      const result = await authService.register(req.body);
      res.status(201).json({
        message: 'Usuario registrado exitosamente',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },

  async login(req, res, next) {
    try {
      const { email, password } = req.query;
      const result = await authService.login({ email, password });
      res.status(200).json({
        message: 'Inicio de sesión exitoso',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },

  async me(req, res, next) {
    try {
      const userId = Number(req.query.userId);
      if (!Number.isInteger(userId) || userId <= 0) {
        throw new AppError('El parámetro userId es requerido y debe ser válido', 400);
      }
      const user = await authService.getProfile(userId);
      res.status(200).json({
        data: user,
      });
    } catch (error) {
      next(error);
    }
  },
};
