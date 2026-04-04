const express               = require('express');
const MoniteurController    = require('../controllers/MoniteurController');
const validateRequest       = require('../middlewares/validateRequest');
const {
  createMoniteurSchema,
  updateMoniteurSchema,
} = require('../validations/moniteurValidation');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Moniteurs
 *   description: Gestion des moniteurs d'auto-école
 */

/**
 * @swagger
 * /api/moniteurs:
 *   post:
 *     summary: Créer un nouveau moniteur
 *     tags: [Moniteurs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nom
 *               - prenom
 *               - email
 *             properties:
 *               nom:
 *                 type: string
 *                 example: "DIALLO"
 *               prenom:
 *                 type: string
 *                 example: "Mamadou"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "mamadou.diallo@auto221.sn"
 *               telephone:
 *                 type: string
 *                 example: "77 123 45 67"
 *               permis_type:
 *                 type: string
 *                 example: "B"
 *     responses:
 *       201:
 *         description: Moniteur créé avec succès
 *       400:
 *         description: Données invalides
 */
router.post(
  '/',
  validateRequest(createMoniteurSchema),
  MoniteurController.create.bind(MoniteurController)
);

/**
 * @swagger
 * /api/moniteurs:
 *   get:
 *     summary: Lister tous les moniteurs
 *     tags: [Moniteurs]
 *     responses:
 *       200:
 *         description: Liste des moniteurs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   nom:
 *                     type: string
 *                   prenom:
 *                     type: string
 *                   email:
 *                     type: string
 *                   telephone:
 *                     type: string
 *                   permis_type:
 *                     type: string
 *                   actif:
 *                     type: boolean
 */
router.get('/', MoniteurController.findAll.bind(MoniteurController));

/**
 * @swagger
 * /api/moniteurs/{id}:
 *   get:
 *     summary: Obtenir un moniteur par son ID
 *     tags: [Moniteurs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du moniteur
 *     responses:
 *       200:
 *         description: Détails du moniteur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 nom:
 *                   type: string
 *                 prenom:
 *                   type: string
 *                 email:
 *                   type: string
 *                 telephone:
 *                   type: string
 *                 permis_type:
 *                   type: string
 *                 actif:
 *                   type: boolean
 *       404:
 *         description: Moniteur non trouvé
 */
router.get('/:id', MoniteurController.findById.bind(MoniteurController));

/**
 * @swagger
 * /api/moniteurs/{id}:
 *   put:
 *     summary: Modifier un moniteur
 *     tags: [Moniteurs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du moniteur
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nom:
 *                 type: string
 *               prenom:
 *                 type: string
 *               email:
 *                 type: string
 *               telephone:
 *                 type: string
 *               permis_type:
 *                 type: string
 *               actif:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Moniteur modifié avec succès
 *       404:
 *         description: Moniteur non trouvé
 *       400:
 *         description: Données invalides
 */
router.put(
  '/:id',
  validateRequest(updateMoniteurSchema),
  MoniteurController.update.bind(MoniteurController)
);

/**
 * @swagger
 * /api/moniteurs/{id}:
 *   delete:
 *     summary: Supprimer un moniteur
 *     tags: [Moniteurs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du moniteur
 *     responses:
 *       200:
 *         description: Moniteur supprimé avec succès
 *       404:
 *         description: Moniteur non trouvé
 */
router.delete('/:id', MoniteurController.delete.bind(MoniteurController));

module.exports = router;