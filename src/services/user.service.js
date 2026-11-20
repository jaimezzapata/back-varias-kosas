import { userRepository } from '../repositories/user.repository.js';
import { toUserResponse } from '../models/user.model.js';
import { AppError } from '../utils/appError.js';

export const userService = {
  async list() {
    const users = await userRepository.findAll();
    return users.map(toUserResponse);
  },

  async getById(id) {
    const user = await userRepository.findById(id);
    if (!user) {
      throw new AppError('Usuario no encontrado', 404);
    }
    return toUserResponse(user);
  },
};
