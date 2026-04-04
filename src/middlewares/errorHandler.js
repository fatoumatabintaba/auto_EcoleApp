const { sendError } = require('../utils/response');

/**
 * Middleware global de gestion des erreurs — doit être déclaré en dernier dans app.js
 */
// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  // Erreur de validation Joi (marquée par validateRequest)
  if (err.isJoi) {
    return sendError(
      res,
      'Erreur de validation',
      400,
      err.details.map((d) => d.message)
    );
  }

  // Prisma — violation de contrainte unique (P2002)
  if (err.code === 'P2002') {
    const field = err.meta?.target?.join(', ') || 'champ';
    return sendError(res, `La valeur du champ "${field}" est déjà utilisée.`, 409);
  }

  // Prisma — enregistrement introuvable lors d'update/delete (P2025)
  if (err.code === 'P2025') {
    return sendError(res, err.meta?.cause || 'Ressource introuvable.', 404);
  }

  // Erreur métier AppError
  if (err.statusCode) {
    return sendError(res, err.message, err.statusCode);
  }

  // Erreur inattendue
  console.error('[ERREUR INTERNE]', err);
  return sendError(res, 'Erreur interne du serveur.', 500);
};

module.exports = errorHandler;
