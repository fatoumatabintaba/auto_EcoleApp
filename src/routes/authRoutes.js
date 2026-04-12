const express        = require('express');
const AuthController = require('../controllers/AuthController');
const validateRequest = require('../middlewares/validateRequest');
const { loginSchema, registerSchema } = require('../validations/authValidation');

const router = express.Router();

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Créer un compte
 *     tags: [Authentification]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example:
 *               prenom: Fatoumata
 *               nom: Ba
 *               email: fatoumata@auto221.sn
 *               password: motdepasse123
 *               role: ADMIN
 *     responses:
 *       201:
 *         description: Compte créé
 *       409:
 *         description: Email déjà utilisé
 */
router.post('/register', validateRequest(registerSchema), AuthController.register.bind(AuthController));

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Se connecter et obtenir un token JWT
 *     tags: [Authentification]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example:
 *               email: fatoumata@auto221.sn
 *               password: motdepasse123
 *     responses:
 *       200:
 *         description: Connexion réussie — retourne le token JWT
 *       401:
 *         description: Email ou mot de passe incorrect
 */
router.post('/login', validateRequest(loginSchema), AuthController.login.bind(AuthController));

module.exports = router;