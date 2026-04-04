const express             = require('express');
const VehiculeController  = require('../controllers/VehiculeController');
const validateRequest     = require('../middlewares/validateRequest');
const {
  createVehiculeSchema,
  updateVehiculeSchema,
} = require('../validations/vehiculeValidation');

const router = express.Router();

// POST   /api/vehicules
router.post(
  '/',
  validateRequest(createVehiculeSchema),
  VehiculeController.create.bind(VehiculeController)
);

// GET    /api/vehicules
router.get('/', VehiculeController.findAll.bind(VehiculeController));

// GET    /api/vehicules/:id
router.get('/:id', VehiculeController.findById.bind(VehiculeController));

// PUT    /api/vehicules/:id
router.put(
  '/:id',
  validateRequest(updateVehiculeSchema),
  VehiculeController.update.bind(VehiculeController)
);

// DELETE /api/vehicules/:id
router.delete('/:id', VehiculeController.delete.bind(VehiculeController));

module.exports = router;
