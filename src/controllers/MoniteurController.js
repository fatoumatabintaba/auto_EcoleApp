const MoniteurService        = require('../services/MoniteurService');
const { sendSuccess }        = require('../utils/response');

class MoniteurController {
  async create(req, res, next) {
    try {
      const moniteur = await MoniteurService.create(req.body);
      return sendSuccess(res, moniteur, 201, 'Moniteur créé avec succès.');
    } catch (err) {
      next(err);
    }
  }

  async findAll(req, res, next) {
    try {
      const moniteurs = await MoniteurService.findAll();
      return sendSuccess(res, moniteurs);
    } catch (err) {
      next(err);
    }
  }

  async findById(req, res, next) {
    try {
      const moniteur = await MoniteurService.findById(Number(req.params.id));
      return sendSuccess(res, moniteur);
    } catch (err) {
      next(err);
    }
  }

  async update(req, res, next) {
    try {
      const moniteur = await MoniteurService.update(Number(req.params.id), req.body);
      return sendSuccess(res, moniteur, 200, 'Moniteur mis à jour avec succès.');
    } catch (err) {
      next(err);
    }
  }

  async delete(req, res, next) {
    try {
      await MoniteurService.delete(Number(req.params.id));
      return sendSuccess(res, null, 200, 'Moniteur supprimé avec succès.');
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new MoniteurController();
