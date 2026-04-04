const SeanceService   = require('../services/SeanceService');
const { sendSuccess } = require('../utils/response');

class SeanceController {
  async create(req, res, next) {
    try {
      const seance = await SeanceService.create(req.body);
      return sendSuccess(res, seance, 201, 'Séance planifiée avec succès.');
    } catch (err) {
      next(err);
    }
  }

  async findAll(req, res, next) {
    try {
      const seances = await SeanceService.findAll();
      return sendSuccess(res, seances);
    } catch (err) {
      next(err);
    }
  }

  async findById(req, res, next) {
    try {
      const seance = await SeanceService.findById(Number(req.params.id));
      return sendSuccess(res, seance);
    } catch (err) {
      next(err);
    }
  }

  async updateStatut(req, res, next) {
    try {
      const seance = await SeanceService.updateStatut(
        Number(req.params.id),
        req.body.statut
      );
      return sendSuccess(res, seance, 200, 'Statut de la séance mis à jour.');
    } catch (err) {
      next(err);
    }
  }

  async delete(req, res, next) {
    try {
      await SeanceService.delete(Number(req.params.id));
      return sendSuccess(res, null, 200, 'Séance supprimée avec succès.');
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new SeanceController();
