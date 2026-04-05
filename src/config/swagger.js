const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'AUTO 221 API',
      version: '1.0.0',
      description: 'API de gestion pour AUTO 221 - Auto-école',
      contact: {
        name: 'Support AUTO 221',
        email: 'support@auto221.sn'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Serveur de développement'
      }
    ],
    components: {
  schemas: {
    CreateMoniteurDto: {
      type: 'object',
      required: ['prenom', 'nom', 'numeroPermis', 'telephone', 'email'],
      example: {
        prenom: 'Moussa',
        nom: 'Diallo',
        numeroPermis: 'SN-2024-001',
        telephone: '771234567',
        email: 'moussa.diallo@auto221.sn'
      },
      properties: {
        prenom:       { type: 'string', minLength: 2 },
        nom:          { type: 'string', minLength: 2 },
        numeroPermis: { type: 'string' },
        telephone:    { type: 'string', minLength: 6 },
        email:        { type: 'string', format: 'email' },
      },
    },
    CreateEleveDto: {
      type: 'object',
      required: ['prenom', 'nom', 'email', 'telephone', 'dateNaissance', 'moniteurId'],
      example: {
        prenom: 'Aminata',
        nom: 'Sow',
        email: 'aminata.sow@gmail.com',
        telephone: '781234567',
        dateNaissance: '2000-03-15',
        moniteurId: 1
      },
      properties: {
        prenom:        { type: 'string' },
        nom:           { type: 'string' },
        email:         { type: 'string', format: 'email' },
        telephone:     { type: 'string' },
        dateNaissance: { type: 'string', format: 'date' },
        moniteurId:    { type: 'integer' },
      },
    },
    CreateVehiculeDto: {
      type: 'object',
      required: ['immatriculation', 'marque', 'modele', 'type'],
      example: {
        immatriculation: 'DK-1234-AA',
        marque: 'Toyota',
        modele: 'Corolla',
        type: 'VOITURE',
        statut: 'DISPONIBLE'
      },
      properties: {
        immatriculation: { type: 'string' },
        marque:          { type: 'string' },
        modele:          { type: 'string' },
        type:            { type: 'string', enum: ['VOITURE', 'MOTO', 'CAMION'] },
        statut:          { type: 'string', enum: ['DISPONIBLE', 'EN_MAINTENANCE', 'HORS_SERVICE'] },
      },
    },
    CreateSeanceDto: {
      type: 'object',
      required: ['dateHeure', 'duree', 'eleveId', 'moniteurId', 'vehiculeId'],
      example: {
        dateHeure: '2026-06-15T09:00:00.000Z',
        duree: 60,
        eleveId: 1,
        moniteurId: 1,
        vehiculeId: 1
      },
      properties: {
        dateHeure:  { type: 'string', format: 'date-time' },
        duree:      { type: 'integer', minimum: 1 },
        eleveId:    { type: 'integer' },
        moniteurId: { type: 'integer' },
        vehiculeId: { type: 'integer' },
      },
    },
    UpdateStatutSeanceDto: {
      type: 'object',
      required: ['statut'],
      example: {
        statut: 'EFFECTUEE'
      },
      properties: {
        statut: { type: 'string', enum: ['PLANIFIEE', 'EFFECTUEE', 'ANNULEE'] },
      },
    },
  },
},
  },
  apis: [                              // ← ICI : même niveau que "definition"
    './src/routes/moniteurRoutes.js',
    './src/routes/eleveRoutes.js',
    './src/routes/vehiculeRoutes.js',
    './src/routes/seanceRoutes.js',
  ],
};

const swaggerSpec = swaggerJsdoc(options);

console.log('📚 Routes Swagger détectées :', Object.keys(swaggerSpec.paths || {}));

module.exports = swaggerSpec;