const express           = require('express');
const SeanceController  = require('../controllers/SeanceController');
const validateRequest   = require('../middlewares/validateRequest');
const {
  createSeanceSchema,
  updateStatutSeanceSchema,
} = require('../validations/seanceValidation');

const router = express.Router();

// POST   /api/seances           — Planifier une séance
router.post(
  '/',
  validateRequest(createSeanceSchema),
  SeanceController.create.bind(SeanceController)
);

// GET    /api/seances           — Lister toutes les séances
router.get('/', SeanceController.findAll.bind(SeanceController));

// GET    /api/seances/:id       — Obtenir une séance
router.get('/:id', SeanceController.findById.bind(SeanceController));

// PATCH  /api/seances/:id/statut — Mettre à jour le statut
router.patch(
  '/:id/statut',
  validateRequest(updateStatutSeanceSchema),
  SeanceController.updateStatut.bind(SeanceController)
);

// DELETE /api/seances/:id       — Supprimer une séance
router.delete('/:id', SeanceController.delete.bind(SeanceController));

module.exports = router;
