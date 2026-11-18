import { AppError } from '../../utils/appError.js';

export function errorMiddleware(err, _req, res, _next) {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      error: err.message,
      ...(err.details ? { details: err.details } : {}),
    });
  }

  if (err?.code === 'P2002') {
    return res.status(409).json({
      error: 'Ya existe un registro con ese valor único',
    });
  }

  if (err?.code === 'P2025') {
    return res.status(404).json({
      error: 'Registro no encontrado',
    });
  }

  console.error('Unhandled error:', err);
  return res.status(500).json({
    error: 'Error interno del servidor',
  });
}
