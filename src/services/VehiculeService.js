const VehiculeRepository = require('../repositories/VehiculeRepository');
const AppError           = require('../utils/AppError');

class VehiculeService {
  async create(data) {
    return VehiculeRepository.create(data);
  }

  async findAll() {
    return VehiculeRepository.findAll();
  }

  async findById(id) {
    const vehicule = await VehiculeRepository.findById(id);
    if (!vehicule) throw new AppError(`Véhicule #${id} introuvable.`, 404);
    return vehicule;
  }

  async update(id, data) {
    await this.findById(id);
    return VehiculeRepository.update(id, data);
  }

  /**
   * Supprimer un véhicule
   * Règle : interdit s'il a des séances PLANIFIEES
   */
  async delete(id) {
    await this.findById(id);

    const nbPlanifiees = await VehiculeRepository.countSeancesPlanifiees(id);
    if (nbPlanifiees > 0) {
      throw new AppError(
        `Impossible de supprimer ce véhicule : il a ${nbPlanifiees} séance(s) planifiée(s).`,
        409
      );
    }

    return VehiculeRepository.delete(id);
  }
}

module.exports = new VehiculeService();
