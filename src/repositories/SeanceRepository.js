const prisma = require('../config/prisma');

class SeanceRepository {
  async create(data) {
    return prisma.seance.create({
      data,
      include: {
        eleve:    { select: { id: true, prenom: true, nom: true } },
        moniteur: { select: { id: true, prenom: true, nom: true } },
        vehicule: { select: { id: true, immatriculation: true, marque: true, modele: true } },
      },
    });
  }

  async findAll() {
    return prisma.seance.findMany({
      include: {
        eleve:    { select: { id: true, prenom: true, nom: true } },
        moniteur: { select: { id: true, prenom: true, nom: true } },
        vehicule: { select: { id: true, immatriculation: true, marque: true, modele: true } },
      },
      orderBy: { dateHeure: 'asc' },
    });
  }

  async findById(id) {
    return prisma.seance.findUnique({
      where: { id },
      include: {
        eleve:    { select: { id: true, prenom: true, nom: true } },
        moniteur: { select: { id: true, prenom: true, nom: true } },
        vehicule: { select: { id: true, immatriculation: true, marque: true, modele: true } },
      },
    });
  }

  async update(id, data) {
    return prisma.seance.update({ where: { id }, data });
  }

  async delete(id) {
    return prisma.seance.delete({ where: { id } });
  }

  /**
   * Vérifie si un moniteur a déjà une séance PLANIFIEE à la même dateHeure
   */
  async findConflitMoniteur(moniteurId, dateHeure, excludeId = null) {
    return prisma.seance.findFirst({
      where: {
        moniteurId,
        dateHeure,
        statut: 'PLANIFIEE',
        ...(excludeId ? { NOT: { id: excludeId } } : {}),
      },
    });
  }

  /**
   * Vérifie si un véhicule a déjà une séance PLANIFIEE à la même dateHeure
   */
  async findConflitVehicule(vehiculeId, dateHeure, excludeId = null) {
    return prisma.seance.findFirst({
      where: {
        vehiculeId,
        dateHeure,
        statut: 'PLANIFIEE',
        ...(excludeId ? { NOT: { id: excludeId } } : {}),
      },
    });
  }
}

module.exports = new SeanceRepository();
