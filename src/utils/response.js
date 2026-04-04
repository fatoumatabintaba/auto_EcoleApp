/**
 * Réponse de succès standardisée
 */
const sendSuccess = (res, data, statusCode = 200, message = 'Succès') => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

/**
 * Réponse d'erreur standardisée
 */
const sendError = (res, message, statusCode = 400, details = null) => {
  const body = { success: false, message };
  if (details) body.details = details;
  return res.status(statusCode).json(body);
};

module.exports = { sendSuccess, sendError };
