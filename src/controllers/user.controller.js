import { userService } from '../services/user.service.js';
import { AppError } from '../utils/appError.js';

export const userController = {
  async list(_req, res, next) {
    try {
      const users = await userService.list();
      res.status(200).json({
        data: users,
      });
    } catch (error) {
      next(error);
    }
  },

  async getById(req, res, next) {
    try {
      const id = Number(req.params.id);
      if (!Number.isInteger(id) || id <= 0) {
        throw new AppError('ID de usuario inválido', 400);
      }
      const user = await userService.getById(id);
      res.status(200).json({
        data: user,
      });
    } catch (error) {
      next(error);
    }
  },
};
