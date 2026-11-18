import { z } from 'zod';
import {
  PUBLICATION_CATEGORIES,
  PUBLICATION_CONDITIONS,
  PUBLICATION_STATUSES,
} from '../../models/publication.model.js';

export const createPublicationSchema = z.object({
  title: z.string().trim().min(3, 'El título debe tener al menos 3 caracteres').max(120),
  description: z.string().trim().min(10, 'La descripción debe tener al menos 10 caracteres').max(1000),
  price: z.coerce.number().positive('El precio debe ser mayor a 0'),
  category: z.enum(PUBLICATION_CATEGORIES, {
    error: `Categoría inválida. Opciones: ${PUBLICATION_CATEGORIES.join(', ')}`,
  }),
  condition: z
    .enum(PUBLICATION_CONDITIONS, {
      error: `Estado físico inválido. Opciones: ${PUBLICATION_CONDITIONS.join(', ')}`,
    })
    .optional(),
  imageUrl: z.string().url('La URL de la imagen no es válida').optional().or(z.literal('')),
});

export const updatePublicationSchema = z
  .object({
    title: z.string().trim().min(3).max(120).optional(),
    description: z.string().trim().min(10).max(1000).optional(),
    price: z.coerce.number().positive('El precio debe ser mayor a 0').optional(),
    category: z.enum(PUBLICATION_CATEGORIES).optional(),
    condition: z.enum(PUBLICATION_CONDITIONS).optional(),
    imageUrl: z.string().url('La URL de la imagen no es válida').optional().or(z.literal('')),
    status: z.enum(PUBLICATION_STATUSES).optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: 'Debes enviar al menos un campo para actualizar',
  });
