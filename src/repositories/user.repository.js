import { prisma } from '../config/prisma.js';

export const userRepository = {
  findAll() {
    return prisma.user.findMany({
      orderBy: { id: 'asc' },
    });
  },

  findByEmail(email) {
    return prisma.user.findUnique({
      where: { email },
    });
  },

  findById(id) {
    return prisma.user.findUnique({
      where: { id },
    });
  },

  create(data) {
    return prisma.user.create({
      data,
    });
  },
};
