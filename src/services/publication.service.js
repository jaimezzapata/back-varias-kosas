import { publicationRepository } from '../repositories/publication.repository.js';
import { toPublicationResponse } from '../models/publication.model.js';
import { AppError } from '../utils/appError.js';

export const publicationService = {
  async list(filters) {
    const publications = await publicationRepository.findAll(filters);
    return publications.map(toPublicationResponse);
  },

  async getById(id) {
    const publication = await publicationRepository.findById(id);
    if (!publication) {
      throw new AppError('Publicación no encontrada', 404);
    }
    return toPublicationResponse(publication);
  },

  async create(userId, payload) {
    const publication = await publicationRepository.create({
      title: payload.title.trim(),
      description: payload.description.trim(),
      price: payload.price,
      category: payload.category,
      condition: payload.condition ?? 'excelente',
      imageUrl: payload.imageUrl || null,
      status: 'disponible',
      userId,
    });

    return toPublicationResponse(publication);
  },

  async update(id, userId, payload) {
    const existing = await publicationRepository.findById(id);
    if (!existing) {
      throw new AppError('Publicación no encontrada', 404);
    }

    if (userId !== undefined && existing.userId !== userId) {
      throw new AppError('No tienes permiso para editar esta publicación', 403);
    }

    const data = {};
    if (payload.title !== undefined) data.title = payload.title.trim();
    if (payload.description !== undefined) data.description = payload.description.trim();
    if (payload.price !== undefined) data.price = payload.price;
    if (payload.category !== undefined) data.category = payload.category;
    if (payload.condition !== undefined) data.condition = payload.condition;
    if (payload.imageUrl !== undefined) data.imageUrl = payload.imageUrl || null;
    if (payload.status !== undefined) data.status = payload.status;

    const updated = await publicationRepository.update(id, data);
    return toPublicationResponse(updated);
  },

  async remove(id, userId) {
    const existing = await publicationRepository.findById(id);
    if (!existing) {
      throw new AppError('Publicación no encontrada', 404);
    }

    if (userId !== undefined && existing.userId !== userId) {
      throw new AppError('No tienes permiso para eliminar esta publicación', 403);
    }

    await publicationRepository.remove(id);
  },
};
