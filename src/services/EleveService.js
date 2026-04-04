const EleveRepository    = require('../repositories/EleveRepository');
const MoniteurRepository = require('../repositories/MoniteurRepository');
const AppError           = require('../utils/AppError');

class EleveService {
  /**
   * Créer un élève
   * Règle : le moniteurId doit exister
   */
  async create(data) {
    const moniteur = await MoniteurRepository.findById(data.moniteurId);
    if (!moniteur) {
      throw new AppError(`Moniteur #${data.moniteurId} introuvable.`, 404);
    }
    return EleveRepository.create(data);
  }

  async findAll() {
    return EleveRepository.findAll();
  }

  async findById(id) {
    const eleve = await EleveRepository.findById(id);
    if (!eleve) throw new AppError(`Élève #${id} introuvable.`, 404);
    return eleve;
  }

  /**
   * Mettre à jour un élève
   * Si moniteurId change, vérifier que le nouveau moniteur existe
   */
  async update(id, data) {
    await this.findById(id);

    if (data.moniteurId) {
      const moniteur = await MoniteurRepository.findById(data.moniteurId);
      if (!moniteur) {
        throw new AppError(`Moniteur #${data.moniteurId} introuvable.`, 404);
      }
    }

    return EleveRepository.update(id, data);
  }

  /**
   * Supprimer un élève
   * Règle : interdit s'il a des séances PLANIFIEES
   */
  async delete(id) {
    await this.findById(id);

    const nbPlanifiees = await EleveRepository.countSeancesPlanifiees(id);
    if (nbPlanifiees > 0) {
      throw new AppError(
        `Impossible de supprimer cet élève : il a ${nbPlanifiees} séance(s) planifiée(s).`,
        409
      );
    }

    return EleveRepository.delete(id);
  }
}

module.exports = new EleveService();
