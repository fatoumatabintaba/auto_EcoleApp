const prisma = require('../config/prisma');

class MoniteurRepository {
  async create(data) {
    return prisma.moniteur.create({ data });
  }

  async findAll() {
    return prisma.moniteur.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findById(id) {
    return prisma.moniteur.findUnique({
      where: { id },
      include: {
        eleves:  { select: { id: true, prenom: true, nom: true } },
        seances: { select: { id: true, statut: true, dateHeure: true } },
      },
    });
  }

  async findByEmail(email) {
    return prisma.moniteur.findUnique({ where: { email } });
  }

  async findByNumeroPermis(numeroPermis) {
    return prisma.moniteur.findUnique({ where: { numeroPermis } });
  }

  async update(id, data) {
    return prisma.moniteur.update({ where: { id }, data });
  }

  async delete(id) {
    return prisma.moniteur.delete({ where: { id } });
  }

  async countEleves(moniteurId) {
    return prisma.eleve.count({ where: { moniteurId } });
  }

  async countSeances(moniteurId) {
    return prisma.seance.count({ where: { moniteurId } });
  }
}

module.exports = new MoniteurRepository();
