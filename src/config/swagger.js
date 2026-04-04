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
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    }
  },
  apis: ['./src/routes/*.js'],  // ← Important : chemin vers vos routes
};

const swaggerSpec = swaggerJsdoc(options);

// Pour déboguer - voir quelles routes sont détectées
console.log('📚 Routes Swagger détectées :', Object.keys(swaggerSpec.paths || {}));

module.exports = swaggerSpec;