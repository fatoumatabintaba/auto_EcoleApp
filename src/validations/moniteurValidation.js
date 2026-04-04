const Joi = require('joi');

const createMoniteurSchema = Joi.object({
  prenom: Joi.string().min(2).required().messages({
    'string.min': 'Le prénom doit contenir au moins 2 caractères.',
    'any.required': 'Le prénom est obligatoire.',
  }),
  nom: Joi.string().min(2).required().messages({
    'string.min': 'Le nom doit contenir au moins 2 caractères.',
    'any.required': 'Le nom est obligatoire.',
  }),
  numeroPermis: Joi.string().required().messages({
    'any.required': 'Le numéro de permis est obligatoire.',
  }),
  telephone: Joi.string()
    .min(6)
    .pattern(/^\d+$/)
    .required()
    .messages({
      'string.min': 'Le téléphone doit contenir au moins 6 chiffres.',
      'string.pattern.base': 'Le téléphone ne doit contenir que des chiffres.',
      'any.required': 'Le téléphone est obligatoire.',
    }),
  email: Joi.string().email().required().messages({
    'string.email': "L'email doit être valide.",
    'any.required': "L'email est obligatoire.",
  }),
});

const updateMoniteurSchema = createMoniteurSchema.fork(
  ['prenom', 'nom', 'numeroPermis', 'telephone', 'email'],
  (field) => field.optional()
);

module.exports = { createMoniteurSchema, updateMoniteurSchema };
