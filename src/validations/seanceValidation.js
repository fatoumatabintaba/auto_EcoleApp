const Joi = require('joi');

const createSeanceSchema = Joi.object({
  dateHeure: Joi.date().greater('now').required().messages({
    'date.greater': 'La dateHeure doit être dans le futur.',
    'any.required': 'La dateHeure est obligatoire.',
  }),
  duree: Joi.number().integer().min(1).required().messages({
    'number.min': 'La durée doit être supérieure à 0.',
    'any.required': 'La durée est obligatoire.',
  }),
  eleveId: Joi.number().integer().positive().required().messages({
    'any.required': "L'eleveId est obligatoire.",
  }),
  moniteurId: Joi.number().integer().positive().required().messages({
    'any.required': 'Le moniteurId est obligatoire.',
  }),
  vehiculeId: Joi.number().integer().positive().required().messages({
    'any.required': 'Le vehiculeId est obligatoire.',
  }),
});

const updateStatutSeanceSchema = Joi.object({
  statut: Joi.string()
    .valid('PLANIFIEE', 'EFFECTUEE', 'ANNULEE')
    .required()
    .messages({
      'any.only': 'Le statut doit être PLANIFIEE, EFFECTUEE ou ANNULEE.',
      'any.required': 'Le statut est obligatoire.',
    }),
});

module.exports = { createSeanceSchema, updateStatutSeanceSchema };
