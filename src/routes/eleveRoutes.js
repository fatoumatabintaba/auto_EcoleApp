const express           = require('express');
const EleveController   = require('../controllers/EleveController');
const validateRequest   = require('../middlewares/validateRequest');
const {
  createEleveSchema,
  updateEleveSchema,
} = require('../validations/eleveValidation');

const router = express.Router();

/**
 * @swagger
 * /api/eleves:
 *   post:
 *     summary: Créer un élève
 *     tags: [Élèves]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateEleveDto'
 *     responses:
 *       201:
 *         description: Élève créé avec succès
 *       400:
 *         description: Erreur de validation
 *       404:
 *         description: Moniteur introuvable
 *       409:
 *         description: Email déjà utilisé
 */
router.post('/', validateRequest(createEleveSchema), EleveController.create.bind(EleveController));

/**
 * @swagger
 * /api/eleves:
 *   get:
 *     summary: Lister tous les élèves
 *     tags: [Élèves]
 *     responses:
 *       200:
 *         description: Liste des élèves
 */
router.get('/', EleveController.findAll.bind(EleveController));

/**
 * @swagger
 * /api/eleves/{id}:
 *   get:
 *     summary: Obtenir un élève par ID
 *     tags: [Élèves]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Élève trouvé
 *       404:
 *         description: Élève introuvable
 */
router.get('/:id', EleveController.findById.bind(EleveController));

/**
 * @swagger
 * /api/eleves/{id}:
 *   put:
 *     summary: Modifier un élève
 *     tags: [Élèves]
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
 *             $ref: '#/components/schemas/CreateEleveDto'
 *     responses:
 *       200:
 *         description: Élève mis à jour
 *       404:
 *         description: Élève introuvable
 */
router.put('/:id', validateRequest(updateEleveSchema), EleveController.update.bind(EleveController));

/**
 * @swagger
 * /api/eleves/{id}:
 *   delete:
 *     summary: Supprimer un élève
 *     tags: [Élèves]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Élève supprimé
 *       409:
 *         description: Suppression impossible (séances planifiées)
 */
router.delete('/:id', EleveController.delete.bind(EleveController));

module.exports = router;