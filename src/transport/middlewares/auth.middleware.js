import { AppError } from '../../utils/appError.js';
import { verifyToken } from '../../utils/jwt.js';

export function authMiddleware(req, _res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new AppError('Token de autenticación requerido', 401));
  }

  const token = authHeader.slice(7).trim();

  try {
    const decoded = verifyToken(token);
    req.user = { id: decoded.id, email: decoded.email };
    return next();
  } catch {
    return next(new AppError('Token inválido o expirado', 401));
  }
}
