import { prisma } from '../config/prisma.js';

export const publicationRepository = {
  findAll({ category, condition, status, search, userId } = {}) {
    const where = {};

    if (category) where.category = category;
    if (condition) where.condition = condition;
    if (status) where.status = status;
    if (userId) where.userId = userId;
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    return prisma.publication.findMany({
      where,
      include: {
        user: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  },

  findById(id) {
    return prisma.publication.findUnique({
      where: { id },
      include: {
        user: true,
      },
    });
  },

  create(data) {
    return prisma.publication.create({
      data,
      include: {
        user: true,
      },
    });
  },

  update(id, data) {
    return prisma.publication.update({
      where: { id },
      data,
      include: {
        user: true,
      },
    });
  },

  remove(id) {
    return prisma.publication.delete({
      where: { id },
    });
  },
};
