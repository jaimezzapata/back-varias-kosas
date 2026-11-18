import 'dotenv/config';

export const env = {
  PORT: Number(process.env.PORT) || 3000,
  DATABASE_URL: process.env.DATABASE_URL,
  JWT_SECRET: process.env.JWT_SECRET || 'varias_kosas_dev_secret_change_in_prod',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
  KEEP_ALIVE_URL: process.env.KEEP_ALIVE_URL || process.env.RENDER_EXTERNAL_URL || '',
  KEEP_ALIVE_INTERVAL_MS: Number(process.env.KEEP_ALIVE_INTERVAL_MS) || 14 * 60 * 1000,
};
