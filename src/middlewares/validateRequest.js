/**
 * Middleware de validation Joi.
 * Usage : router.post('/', validateRequest(monSchema), monController)
 */
const validateRequest = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    error.isJoi = true;
    return next(error);
  }
  req.body = value; // données normalisées par Joi
  return next();
};

module.exports = validateRequest;
