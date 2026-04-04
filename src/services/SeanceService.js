const SeanceRepository   = require('../repositories/SeanceRepository');
const EleveRepository    = require('../repositories/EleveRepository');
const MoniteurRepository = require('../repositories/MoniteurRepository');
const VehiculeRepository = require('../repositories/VehiculeRepository');
const AppError           = require('../utils/AppError');

class SeanceService {
  /**
   * Planifier une séance — toutes les vérifications métier
   */
  async create(data) {
    const { eleveId, moniteurId, vehiculeId, dateHeure } = data;

    // 1. Vérifier existence des entités liées
    const eleve = await EleveRepository.findById(eleveId);
    if (!eleve) throw new AppError(`Élève #${eleveId} introuvable.`, 404);

    const moniteur = await MoniteurRepository.findById(moniteurId);
    if (!moniteur) throw new AppError(`Moniteur #${moniteurId} introuvable.`, 404);

    const vehicule = await VehiculeRepository.findById(vehiculeId);
    if (!vehicule) throw new AppError(`Véhicule #${vehiculeId} introuvable.`, 404);

    // 2. Vérifier que le véhicule est DISPONIBLE
    if (vehicule.statut === 'HORS_SERVICE') {
      throw new AppError('Ce véhicule est HORS_SERVICE et ne peut pas être affecté à une séance.', 409);
    }
    if (vehicule.statut === 'EN_MAINTENANCE') {
      throw new AppError('Ce véhicule est EN_MAINTENANCE et ne peut pas être affecté à une séance.', 409);
    }

    // 3. Vérifier dateHeure dans le futur (déjà validé par Joi, double-sécurité)
    const now = new Date();
    if (new Date(dateHeure) <= now) {
      throw new AppError('La dateHeure doit être dans le futur.', 400);
    }

    // 4. Vérifier conflit de créneau pour le moniteur
    const conflitMoniteur = await SeanceRepository.findConflitMoniteur(moniteurId, new Date(dateHeure));
    if (conflitMoniteur) {
      throw new AppError(
        `Le moniteur #${moniteurId} a déjà une séance planifiée à cette date et heure.`,
        409
      );
    }

    // 5. Vérifier conflit de créneau pour le véhicule
    const conflitVehicule = await SeanceRepository.findConflitVehicule(vehiculeId, new Date(dateHeure));
    if (conflitVehicule) {
      throw new AppError(
        `Le véhicule #${vehiculeId} est déjà affecté à une séance à cette date et heure.`,
        409
      );
    }

    // 6. Créer la séance avec statut PLANIFIEE
    return SeanceRepository.create({
      ...data,
      dateHeure: new Date(dateHeure),
      statut: 'PLANIFIEE',
    });
  }

  async findAll() {
    return SeanceRepository.findAll();
  }

  async findById(id) {
    const seance = await SeanceRepository.findById(id);
    if (!seance) throw new AppError(`Séance #${id} introuvable.`, 404);
    return seance;
  }

  /**
   * Mettre à jour le statut d'une séance (PLANIFIEE → EFFECTUEE ou ANNULEE)
   */
  async updateStatut(id, statut) {
    await this.findById(id);
    return SeanceRepository.update(id, { statut });
  }

  /**
   * Supprimer une séance (uniquement si ANNULEE ou EFFECTUEE)
   */
  async delete(id) {
    const seance = await this.findById(id);
    if (seance.statut === 'PLANIFIEE') {
      throw new AppError(
        'Impossible de supprimer une séance PLANIFIEE. Annulez-la d\'abord.',
        409
      );
    }
    return SeanceRepository.delete(id);
  }
}

module.exports = new SeanceService();
