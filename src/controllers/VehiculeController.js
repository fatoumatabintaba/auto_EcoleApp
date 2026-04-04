const VehiculeService = require('../services/VehiculeService');
const { sendSuccess } = require('../utils/response');

class VehiculeController {
  async create(req, res, next) {
    try {
      const vehicule = await VehiculeService.create(req.body);
      return sendSuccess(res, vehicule, 201, 'Véhicule créé avec succès.');
    } catch (err) {
      next(err);
    }
  }

  async findAll(req, res, next) {
    try {
      const vehicules = await VehiculeService.findAll();
      return sendSuccess(res, vehicules);
    } catch (err) {
      next(err);
    }
  }

  async findById(req, res, next) {
    try {
      const vehicule = await VehiculeService.findById(Number(req.params.id));
      return sendSuccess(res, vehicule);
    } catch (err) {
      next(err);
    }
  }

  async update(req, res, next) {
    try {
      const vehicule = await VehiculeService.update(Number(req.params.id), req.body);
      return sendSuccess(res, vehicule, 200, 'Véhicule mis à jour avec succès.');
    } catch (err) {
      next(err);
    }
  }

  async delete(req, res, next) {
    try {
      await VehiculeService.delete(Number(req.params.id));
      return sendSuccess(res, null, 200, 'Véhicule supprimé avec succès.');
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new VehiculeController();
