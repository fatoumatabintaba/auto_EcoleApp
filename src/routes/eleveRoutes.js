const express           = require('express');
const EleveController   = require('../controllers/EleveController');
const validateRequest   = require('../middlewares/validateRequest');
const {
  createEleveSchema,
  updateEleveSchema,
} = require('../validations/eleveValidation');

const router = express.Router();

// POST   /api/eleves
router.post(
  '/',
  validateRequest(createEleveSchema),
  EleveController.create.bind(EleveController)
);

// GET    /api/eleves
router.get('/', EleveController.findAll.bind(EleveController));

// GET    /api/eleves/:id
router.get('/:id', EleveController.findById.bind(EleveController));

// PUT    /api/eleves/:id
router.put(
  '/:id',
  validateRequest(updateEleveSchema),
  EleveController.update.bind(EleveController)
);

// DELETE /api/eleves/:id
router.delete('/:id', EleveController.delete.bind(EleveController));

module.exports = router;
