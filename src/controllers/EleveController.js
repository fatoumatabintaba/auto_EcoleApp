const EleveService  = require('../services/EleveService');
const { sendSuccess } = require('../utils/response');

class EleveController {
  async create(req, res, next) {
    try {
      const eleve = await EleveService.create(req.body);
      return sendSuccess(res, eleve, 201, 'Élève créé avec succès.');
    } catch (err) {
      next(err);
    }
  }

  async findAll(req, res, next) {
    try {
      const eleves = await EleveService.findAll();
      return sendSuccess(res, eleves);
    } catch (err) {
      next(err);
    }
  }

  async findById(req, res, next) {
    try {
      const eleve = await EleveService.findById(Number(req.params.id));
      return sendSuccess(res, eleve);
    } catch (err) {
      next(err);
    }
  }

  async update(req, res, next) {
    try {
      const eleve = await EleveService.update(Number(req.params.id), req.body);
      return sendSuccess(res, eleve, 200, 'Élève mis à jour avec succès.');
    } catch (err) {
      next(err);
    }
  }

  async delete(req, res, next) {
    try {
      await EleveService.delete(Number(req.params.id));
      return sendSuccess(res, null, 200, 'Élève supprimé avec succès.');
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new EleveController();
