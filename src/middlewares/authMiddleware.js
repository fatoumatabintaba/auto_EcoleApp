const jwt            = require('jsonwebtoken');
const { sendError }  = require('../utils/response');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return sendError(res, 'Token manquant. Veuillez vous connecter.', 401);
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, email, role }
    next();
  } catch (err) {
    return sendError(res, 'Token invalide ou expiré.', 401);
  }
};

module.exports = authMiddleware;