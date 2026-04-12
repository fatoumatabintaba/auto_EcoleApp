const express          = require('express');
const moniteurRoutes   = require('./routes/moniteurRoutes');
const eleveRoutes      = require('./routes/eleveRoutes');
const vehiculeRoutes   = require('./routes/vehiculeRoutes');
const seanceRoutes     = require('./routes/seanceRoutes');
const errorHandler     = require('./middlewares/errorHandler');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
const authRoutes = require('./routes/authRoutes');
const authMiddleware = require('./middlewares/authMiddleware');


const app = express();

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/auth', authRoutes);

// Routes API
app.use('/api/moniteurs', authMiddleware, moniteurRoutes);
app.use('/api/eleves',    authMiddleware, eleveRoutes);
app.use('/api/vehicules', authMiddleware, vehiculeRoutes);
app.use('/api/seances',   authMiddleware, seanceRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'AUTO 221 API opérationnelle.' });
});
// Swagger UI
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// 404 — route non trouvée
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} introuvable.` });
});

// Gestionnaire d'erreurs global (doit être en dernier)
app.use(errorHandler);

module.exports = app;
