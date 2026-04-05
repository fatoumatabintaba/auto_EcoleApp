const express           = require('express');
const SeanceController  = require('../controllers/SeanceController');
const validateRequest   = require('../middlewares/validateRequest');
const {
  createSeanceSchema,
  updateStatutSeanceSchema,
} = require('../validations/seanceValidation');

const router = express.Router();

/**
 * @swagger
 * /api/seances:
 *   post:
 *     summary: Planifier une séance de conduite
 *     tags: [Séances]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateSeanceDto'
 *     responses:
 *       201:
 *         description: Séance planifiée avec succès
 *       400:
 *         description: Erreur de validation
 *       404:
 *         description: Élève, moniteur ou véhicule introuvable
 *       409:
 *         description: Conflit de créneau ou véhicule indisponible
 */
router.post('/', validateRequest(createSeanceSchema), SeanceController.create.bind(SeanceController));

/**
 * @swagger
 * /api/seances:
 *   get:
 *     summary: Lister toutes les séances
 *     tags: [Séances]
 *     responses:
 *       200:
 *         description: Liste des séances
 */
router.get('/', SeanceController.findAll.bind(SeanceController));

/**
 * @swagger
 * /api/seances/{id}:
 *   get:
 *     summary: Obtenir une séance par ID
 *     tags: [Séances]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Séance trouvée
 *       404:
 *         description: Séance introuvable
 */
router.get('/:id', SeanceController.findById.bind(SeanceController));

/**
 * @swagger
 * /api/seances/{id}/statut:
 *   patch:
 *     summary: Mettre à jour le statut d'une séance
 *     tags: [Séances]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateStatutSeanceDto'
 *     responses:
 *       200:
 *         description: Statut mis à jour
 *       404:
 *         description: Séance introuvable
 */
router.patch('/:id/statut', validateRequest(updateStatutSeanceSchema), SeanceController.updateStatut.bind(SeanceController));

/**
 * @swagger
 * /api/seances/{id}:
 *   delete:
 *     summary: Supprimer une séance
 *     tags: [Séances]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Séance supprimée
 *       409:
 *         description: Impossible de supprimer une séance PLANIFIEE
 */
router.delete('/:id', SeanceController.delete.bind(SeanceController));

module.exports = router;