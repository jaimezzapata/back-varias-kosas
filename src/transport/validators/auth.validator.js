import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().trim().min(2, 'El nombre debe tener al menos 2 caracteres').max(80),
  email: z.string().trim().email('Correo electrónico inválido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres').max(100),
  phone: z.string().trim().min(7, 'Teléfono inválido').max(20).optional(),
  city: z.string().trim().min(2, 'Ciudad inválida').max(60).optional(),
});

export const loginSchema = z.object({
  email: z.string().trim().email('Correo electrónico inválido'),
  password: z.string().min(1, 'La contraseña es requerida'),
});
