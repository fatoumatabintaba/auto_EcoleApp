const Joi = require('joi');

const TYPES_VEHICULE   = ['VOITURE', 'MOTO', 'CAMION'];
const STATUTS_VEHICULE = ['DISPONIBLE', 'EN_MAINTENANCE', 'HORS_SERVICE'];

const createVehiculeSchema = Joi.object({
  immatriculation: Joi.string().required().messages({
    'any.required': "L'immatriculation est obligatoire.",
  }),
  marque: Joi.string().required().messages({
    'any.required': 'La marque est obligatoire.',
  }),
  modele: Joi.string().required().messages({
    'any.required': 'Le modèle est obligatoire.',
  }),
  type: Joi.string()
    .valid(...TYPES_VEHICULE)
    .required()
    .messages({
      'any.only': `Le type doit être : ${TYPES_VEHICULE.join(', ')}.`,
      'any.required': 'Le type est obligatoire.',
    }),
  statut: Joi.string()
    .valid(...STATUTS_VEHICULE)
    .optional()
    .messages({
      'any.only': `Le statut doit être : ${STATUTS_VEHICULE.join(', ')}.`,
    }),
});

const updateVehiculeSchema = createVehiculeSchema.fork(
  ['immatriculation', 'marque', 'modele', 'type'],
  (field) => field.optional()
);

module.exports = { createVehiculeSchema, updateVehiculeSchema };
