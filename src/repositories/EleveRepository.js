const prisma = require('../config/prisma');

class EleveRepository {
  async create(data) {
    return prisma.eleve.create({ data });
  }

  async findAll() {
    return prisma.eleve.findMany({
      include: {
        moniteur: { select: { id: true, prenom: true, nom: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findById(id) {
    return prisma.eleve.findUnique({
      where: { id },
      include: {
        moniteur: { select: { id: true, prenom: true, nom: true } },
        seances:  { select: { id: true, statut: true, dateHeure: true } },
      },
    });
  }

  async findByEmail(email) {
    return prisma.eleve.findUnique({ where: { email } });
  }

  async update(id, data) {
    return prisma.eleve.update({ where: { id }, data });
  }

  async delete(id) {
    return prisma.eleve.delete({ where: { id } });
  }

  async countSeancesPlanifiees(eleveId) {
    return prisma.seance.count({
      where: { eleveId, statut: 'PLANIFIEE' },
    });
  }
}

module.exports = new EleveRepository();
