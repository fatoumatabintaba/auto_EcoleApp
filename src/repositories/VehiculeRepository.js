const prisma = require('../config/prisma');

class VehiculeRepository {
  async create(data) {
    return prisma.vehicule.create({ data });
  }

  async findAll() {
    return prisma.vehicule.findMany({ orderBy: { createdAt: 'desc' } });
  }

  async findById(id) {
    return prisma.vehicule.findUnique({
      where: { id },
      include: {
        seances: { select: { id: true, statut: true, dateHeure: true } },
      },
    });
  }

  async findByImmatriculation(immatriculation) {
    return prisma.vehicule.findUnique({ where: { immatriculation } });
  }

  async update(id, data) {
    return prisma.vehicule.update({ where: { id }, data });
  }

  async delete(id) {
    return prisma.vehicule.delete({ where: { id } });
  }

  async countSeancesPlanifiees(vehiculeId) {
    return prisma.seance.count({
      where: { vehiculeId, statut: 'PLANIFIEE' },
    });
  }
}

module.exports = new VehiculeRepository();
