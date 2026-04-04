/**
 * Erreur métier avec code HTTP personnalisé.
 * Exemple : throw new AppError('Moniteur introuvable.', 404)
 */
class AppError extends Error {
  constructor(message, statusCode = 400) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
