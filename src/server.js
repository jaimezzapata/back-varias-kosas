import app from './app.js';
import { env } from './config/env.js';
import { prisma } from './config/prisma.js';

async function startServer() {
  try {
    await prisma.$connect();
    console.log('Conexión a la base de datos establecida con Prisma');

    app.listen(env.PORT, () => {
      console.log(`Servidor varias-kosas escuchando en http://localhost:${env.PORT}`);
    });
  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
    process.exit(1);
  }
}

startServer();
