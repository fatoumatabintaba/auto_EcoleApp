const Joi = require('joi');

const loginSchema = Joi.object({
  email:    Joi.string().email().required().messages({
    'any.required': 'Email obligatoire.',
    'string.email': 'Email invalide.',
  }),
  password: Joi.string().min(6).required().messages({
    'any.required': 'Mot de passe obligatoire.',
    'string.min':   'Mot de passe minimum 6 caractères.',
  }),
});

const registerSchema = Joi.object({
  prenom:   Joi.string().min(2).required(),
  nom:      Joi.string().min(2).required(),
  email:    Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role:     Joi.string().valid('ADMIN', 'MONITEUR').default('MONITEUR'),
});

module.exports = { loginSchema, registerSchema };