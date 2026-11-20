import { publicationService } from '../services/publication.service.js';
import { AppError } from '../utils/appError.js';

function parseId(rawId, label = 'ID de publicación inválido') {
  const id = Number(rawId);
  if (!Number.isInteger(id) || id <= 0) {
    throw new AppError(label, 400);
  }
  return id;
}

export const publicationController = {
  async list(req, res, next) {
    try {
      const { category, condition, status, search, userId } = req.query;
      const publications = await publicationService.list({
        category,
        condition,
        status,
        search,
        userId: userId ? parseId(userId, 'userId inválido') : undefined,
      });
      res.status(200).json({
        data: publications,
      });
    } catch (error) {
      next(error);
    }
  },

  async listMine(req, res, next) {
    try {
      const { category, condition, status, search, userId } = req.query;
      const parsedUserId = parseId(userId, 'El parámetro userId es requerido y debe ser válido');
      const publications = await publicationService.list({
        category,
        condition,
        status,
        search,
        userId: parsedUserId,
      });
      res.status(200).json({
        data: publications,
      });
    } catch (error) {
      next(error);
    }
  },

  async getById(req, res, next) {
    try {
      const id = parseId(req.params.id);
      const publication = await publicationService.getById(id);
      res.status(200).json({
        data: publication,
      });
    } catch (error) {
      next(error);
    }
  },

  async create(req, res, next) {
    try {
      const publication = await publicationService.create(req.body.userId, req.body);
      res.status(201).json({
        message: 'Publicación creada exitosamente',
        data: publication,
      });
    } catch (error) {
      next(error);
    }
  },

  async update(req, res, next) {
    try {
      const id = parseId(req.params.id);
      const rawUserId = req.body.userId ?? req.query.userId;
      const userId = rawUserId !== undefined ? parseId(rawUserId, 'userId inválido') : undefined;
      const publication = await publicationService.update(id, userId, req.body);
      res.status(200).json({
        message: 'Publicación actualizada exitosamente',
        data: publication,
      });
    } catch (error) {
      next(error);
    }
  },

  async remove(req, res, next) {
    try {
      const id = parseId(req.params.id);
      const rawUserId = req.query.userId ?? req.body?.userId;
      const userId = rawUserId !== undefined ? parseId(rawUserId, 'userId inválido') : undefined;
      await publicationService.remove(id, userId);
      res.status(200).json({
        message: 'Publicación eliminada exitosamente',
      });
    } catch (error) {
      next(error);
    }
  },
};
