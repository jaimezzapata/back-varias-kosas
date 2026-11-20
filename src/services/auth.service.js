import bcrypt from 'bcryptjs';
import { userRepository } from '../repositories/user.repository.js';
import { toUserResponse } from '../models/user.model.js';
import { AppError } from '../utils/appError.js';

export const authService = {
  async register({ name, email, password, phone, city }) {
    const normalizedEmail = email.trim().toLowerCase();
    const existing = await userRepository.findByEmail(normalizedEmail);

    if (existing) {
      throw new AppError('El correo electrónico ya está registrado', 409);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userRepository.create({
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      phone: phone?.trim() || null,
      city: city?.trim() || null,
    });

    return {
      user: toUserResponse(user),
    };
  },

  async login({ email, password }) {
    if (!email || !password) {
      throw new AppError('Correo y contraseña requeridos', 400);
    }

    const normalizedEmail = email.trim().toLowerCase();
    const user = await userRepository.findByEmail(normalizedEmail);

    if (!user) {
      throw new AppError('Credenciales inválidas', 401);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new AppError('Credenciales inválidas', 401);
    }

    return {
      user: toUserResponse(user),
    };
  },

  async getProfile(userId) {
    const user = await userRepository.findById(userId);
    if (!user) {
      throw new AppError('Usuario no encontrado', 404);
    }
    return toUserResponse(user);
  },
};
