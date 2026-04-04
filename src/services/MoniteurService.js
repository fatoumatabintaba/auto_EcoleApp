const MoniteurRepository = require('../repositories/MoniteurRepository');
const AppError = require('../utils/AppError');

class MoniteurService {
  /**
   * Créer un moniteur
   */
  async create(data) {
    return MoniteurRepository.create(data);
    // Les unicités email/numeroPermis sont gérées par Prisma (P2002 → errorHandler)
  }

  /**
   * Lister tous les moniteurs
   */
  async findAll() {
    return MoniteurRepository.findAll();
  }

  /**
   * Obtenir un moniteur par ID — lance 404 si absent
   */
  async findById(id) {
    const moniteur = await MoniteurRepository.findById(id);
    if (!moniteur) throw new AppError(`Moniteur #${id} introuvable.`, 404);
    return moniteur;
  }

  /**
   * Mettre à jour un moniteur
   */
  async update(id, data) {
    await this.findById(id); // vérifie l'existence
    return MoniteurRepository.update(id, data);
  }

  /**
   * Supprimer un moniteur
   * Règle : interdit s'il a des élèves ou des séances
   */
  async delete(id) {
    await this.findById(id); // vérifie l'existence

    const nbEleves  = await MoniteurRepository.countEleves(id);
    if (nbEleves > 0) {
      throw new AppError(
        `Impossible de supprimer ce moniteur : il a ${nbEleves} élève(s) associé(s).`,
        409
      );
    }

    const nbSeances = await MoniteurRepository.countSeances(id);
    if (nbSeances > 0) {
      throw new AppError(
        `Impossible de supprimer ce moniteur : il a ${nbSeances} séance(s) associée(s).`,
        409
      );
    }

    return MoniteurRepository.delete(id);
  }
}

module.exports = new MoniteurService();
