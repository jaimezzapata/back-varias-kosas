import { toUserResponse } from './user.model.js';

export const PUBLICATION_CATEGORIES = [
  'ropa',
  'tecnologia',
  'hogar',
  'deportes',
  'libros',
  'accesorios',
  'otros',
];

export const PUBLICATION_CONDITIONS = [
  'nuevo',
  'como_nuevo',
  'excelente',
  'bueno',
];

export const PUBLICATION_STATUSES = [
  'disponible',
  'vendido',
  'pausado',
];

export function toPublicationResponse(publication) {
  if (!publication) return null;

  return {
    id: publication.id,
    title: publication.title,
    description: publication.description,
    price: publication.price,
    category: publication.category,
    condition: publication.condition,
    imageUrl: publication.imageUrl,
    status: publication.status,
    userId: publication.userId,
    seller: publication.user ? toUserResponse(publication.user) : undefined,
    createdAt: publication.createdAt,
    updatedAt: publication.updatedAt,
  };
}
