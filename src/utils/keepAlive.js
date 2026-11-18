import { env } from '../config/env.js';
import { prisma } from '../config/prisma.js';

async function pingDatabaseAndServer() {
  try {
    await prisma.$queryRaw`SELECT 1`;

    if (env.KEEP_ALIVE_URL) {
      const targetUrl = `${env.KEEP_ALIVE_URL.replace(/\/$/, '')}/api/health`;
      const response = await fetch(targetUrl);
      console.log(`[keep-alive] Ping a ${targetUrl} -> ${response.status}`);
    } else {
      console.log('[keep-alive] Ping a base de datos OK');
    }
  } catch (error) {
    console.error('[keep-alive] Error en ping:', error.message);
  }
}

export function startKeepAlive() {
  const intervalMinutes = Math.round(env.KEEP_ALIVE_INTERVAL_MS / 60000);
  console.log(`[keep-alive] Activo cada ${intervalMinutes} minuto(s)`);

  return setInterval(pingDatabaseAndServer, env.KEEP_ALIVE_INTERVAL_MS);
}
