const Joi = require('joi');

const createEleveSchema = Joi.object({
  prenom: Joi.string().min(2).required().messages({
    'string.min': 'Le prénom doit contenir au moins 2 caractères.',
    'any.required': 'Le prénom est obligatoire.',
  }),
  nom: Joi.string().min(2).required().messages({
    'string.min': 'Le nom doit contenir au moins 2 caractères.',
    'any.required': 'Le nom est obligatoire.',
  }),
  email: Joi.string().email().required().messages({
    'string.email': "L'email doit être valide.",
    'any.required': "L'email est obligatoire.",
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
  dateNaissance: Joi.date().max('now').required().messages({
    'date.max': 'La date de naissance ne peut pas être dans le futur.',
    'any.required': 'La date de naissance est obligatoire.',
  }),
  moniteurId: Joi.number().integer().positive().required().messages({
    'any.required': 'Le moniteurId est obligatoire.',
  }),
});

const updateEleveSchema = createEleveSchema.fork(
  ['prenom', 'nom', 'email', 'telephone', 'dateNaissance', 'moniteurId'],
  (field) => field.optional()
);

module.exports = { createEleveSchema, updateEleveSchema };
