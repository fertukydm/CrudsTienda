import jwt from 'jsonwebtoken';
import Review from '../models/review.js'; 

// ✅ Verifica token JWT obligatorio
export const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ success: false, message: 'Token requerido' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'tu_clave_secreta');
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ success: false, message: 'Token inválido o expirado' });
  }
};

// ✅ Verifica token JWT si existe (autenticación opcional)
export const optionalAuth = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'tu_clave_secreta');
      req.user = decoded;
    } catch (_) {
      // Token inválido: ignoramos pero no bloqueamos
    }
  }

  next();
};

// ✅ Verifica si el usuario es el dueño de la review
export const checkReviewOwnership = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const review = await Review.findById(id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review no encontrada'
      });
    }

    if (review.userId.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: 'No tienes permisos para modificar esta review'
      });
    }

    req.review = review;
    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al verificar permisos',
      error: error.message
    });
  }
};

// ✅ Middleware de rate limit para evitar spam de reviews
export const reviewRateLimit = (() => {
  const attempts = new Map(); // userId -> [timestamps]

  return (req, res, next) => {
    const userId = req.user?.id;
    const now = Date.now();
    const windowMs = 60 * 1000; // 1 minuto
    const maxAttempts = 3;

    if (!userId) return next(); // si no hay usuario, no limitamos

    const userAttempts = attempts.get(userId) || [];

    // Limpiamos intentos viejos
    const recentAttempts = userAttempts.filter(time => now - time < windowMs);
    if (recentAttempts.length >= maxAttempts) {
      return res.status(429).json({
        success: false,
        message: 'Demasiados intentos. Espera un momento antes de intentar nuevamente.'
      });
    }

    // Agregamos el intento actual
    recentAttempts.push(now);
    attempts.set(userId, recentAttempts);

    next();
  };
})();

