-- CreateEnum
CREATE TYPE "TypeVehicule" AS ENUM ('VOITURE', 'MOTO', 'CAMION');

-- CreateEnum
CREATE TYPE "StatutVehicule" AS ENUM ('DISPONIBLE', 'EN_MAINTENANCE', 'HORS_SERVICE');

-- CreateEnum
CREATE TYPE "StatutSeance" AS ENUM ('PLANIFIEE', 'EFFECTUEE', 'ANNULEE');

-- CreateTable
CREATE TABLE "Moniteur" (
    "id" SERIAL NOT NULL,
    "prenom" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "numeroPermis" TEXT NOT NULL,
    "telephone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Moniteur_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Eleve" (
    "id" SERIAL NOT NULL,
    "prenom" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telephone" TEXT NOT NULL,
    "dateNaissance" TIMESTAMP(3) NOT NULL,
    "moniteurId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Eleve_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vehicule" (
    "id" SERIAL NOT NULL,
    "immatriculation" TEXT NOT NULL,
    "marque" TEXT NOT NULL,
    "modele" TEXT NOT NULL,
    "type" "TypeVehicule" NOT NULL,
    "statut" "StatutVehicule" NOT NULL DEFAULT 'DISPONIBLE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Vehicule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Seance" (
    "id" SERIAL NOT NULL,
    "dateHeure" TIMESTAMP(3) NOT NULL,
    "duree" INTEGER NOT NULL,
    "eleveId" INTEGER NOT NULL,
    "moniteurId" INTEGER NOT NULL,
    "vehiculeId" INTEGER NOT NULL,
    "statut" "StatutSeance" NOT NULL DEFAULT 'PLANIFIEE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Seance_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Moniteur_numeroPermis_key" ON "Moniteur"("numeroPermis");

-- CreateIndex
CREATE UNIQUE INDEX "Moniteur_email_key" ON "Moniteur"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Eleve_email_key" ON "Eleve"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Vehicule_immatriculation_key" ON "Vehicule"("immatriculation");

-- AddForeignKey
ALTER TABLE "Eleve" ADD CONSTRAINT "Eleve_moniteurId_fkey" FOREIGN KEY ("moniteurId") REFERENCES "Moniteur"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Seance" ADD CONSTRAINT "Seance_eleveId_fkey" FOREIGN KEY ("eleveId") REFERENCES "Eleve"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Seance" ADD CONSTRAINT "Seance_moniteurId_fkey" FOREIGN KEY ("moniteurId") REFERENCES "Moniteur"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Seance" ADD CONSTRAINT "Seance_vehiculeId_fkey" FOREIGN KEY ("vehiculeId") REFERENCES "Vehicule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
