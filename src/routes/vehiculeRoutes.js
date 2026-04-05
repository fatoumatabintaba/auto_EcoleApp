const express             = require('express');
const VehiculeController  = require('../controllers/VehiculeController');
const validateRequest     = require('../middlewares/validateRequest');
const {
  createVehiculeSchema,
  updateVehiculeSchema,
} = require('../validations/vehiculeValidation');

const router = express.Router();

/**
 * @swagger
 * /api/vehicules:
 *   post:
 *     summary: Créer un véhicule
 *     tags: [Véhicules]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateVehiculeDto'
 *     responses:
 *       201:
 *         description: Véhicule créé avec succès
 *       400:
 *         description: Erreur de validation
 *       409:
 *         description: Immatriculation déjà utilisée
 */
router.post('/', validateRequest(createVehiculeSchema), VehiculeController.create.bind(VehiculeController));

/**
 * @swagger
 * /api/vehicules:
 *   get:
 *     summary: Lister tous les véhicules
 *     tags: [Véhicules]
 *     responses:
 *       200:
 *         description: Liste des véhicules
 */
router.get('/', VehiculeController.findAll.bind(VehiculeController));

/**
 * @swagger
 * /api/vehicules/{id}:
 *   get:
 *     summary: Obtenir un véhicule par ID
 *     tags: [Véhicules]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Véhicule trouvé
 *       404:
 *         description: Véhicule introuvable
 */
router.get('/:id', VehiculeController.findById.bind(VehiculeController));

/**
 * @swagger
 * /api/vehicules/{id}:
 *   put:
 *     summary: Modifier un véhicule
 *     tags: [Véhicules]
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
 *             $ref: '#/components/schemas/CreateVehiculeDto'
 *     responses:
 *       200:
 *         description: Véhicule mis à jour
 *       404:
 *         description: Véhicule introuvable
 */
router.put('/:id', validateRequest(updateVehiculeSchema), VehiculeController.update.bind(VehiculeController));

/**
 * @swagger
 * /api/vehicules/{id}:
 *   delete:
 *     summary: Supprimer un véhicule
 *     tags: [Véhicules]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Véhicule supprimé
 *       409:
 *         description: Suppression impossible (séances planifiées)
 */
router.delete('/:id', VehiculeController.delete.bind(VehiculeController));

module.exports = router;