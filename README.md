# AUTO 221 — API de gestion d'auto-école

> Projet réalisé par **Fatoumata B Ba**  
> Stack : Node.js · Express · Prisma · PostgreSQL · POO

---

## Architecture du projet

```
auto221/
├── prisma/
│   └── schema.prisma
├── src/
│   ├── config/
│   │   └── prisma.js              # Instance Prisma partagée
│   ├── controllers/
│   │   ├── MoniteurController.js
│   │   ├── EleveController.js
│   │   ├── VehiculeController.js
│   │   └── SeanceController.js
│   ├── middlewares/
│   │   ├── errorHandler.js        # Gestion globale des erreurs
│   │   └── validateRequest.js     # Validation Joi
│   ├── repositories/
│   │   ├── MoniteurRepository.js  # Accès données Prisma
│   │   ├── EleveRepository.js
│   │   ├── VehiculeRepository.js
│   │   └── SeanceRepository.js
│   ├── routes/
│   │   ├── moniteurRoutes.js
│   │   ├── eleveRoutes.js
│   │   ├── vehiculeRoutes.js
│   │   └── seanceRoutes.js
│   ├── services/
│   │   ├── MoniteurService.js     # Logique métier
│   │   ├── EleveService.js
│   │   ├── VehiculeService.js
│   │   └── SeanceService.js
│   ├── utils/
│   │   ├── AppError.js            # Erreur métier avec code HTTP
│   │   └── response.js            # Helpers réponse standardisée
│   ├── validations/
│   │   ├── moniteurValidation.js  # Schémas Joi
│   │   ├── eleveValidation.js
│   │   ├── vehiculeValidation.js
│   │   └── seanceValidation.js
│   ├── app.js
│   └── server.js
├── .env.example
├── .gitignore
└── package.json
```

---

## Installation

```bash
# 1. Cloner le projet
git clone <repo>
cd auto221

# 2. Installer les dépendances
npm install

# 3. Configurer l'environnement
cp .env.example .env
# Éditer .env avec vos infos de connexion PostgreSQL

# 4. Générer le client Prisma et appliquer les migrations
npm run db:generate
npm run db:migrate

# 5. Démarrer en développement
npm run dev
```

---

## Variables d'environnement

```env
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/auto221?schema=public"
PORT=3000
NODE_ENV=development
```

---

## Endpoints API

### Moniteurs — `/api/moniteurs`

| Méthode | URL                   | Description              |
|---------|-----------------------|--------------------------|
| POST    | /api/moniteurs        | Créer un moniteur        |
| GET     | /api/moniteurs        | Lister tous les moniteurs|
| GET     | /api/moniteurs/:id    | Obtenir un moniteur      |
| PUT     | /api/moniteurs/:id    | Modifier un moniteur     |
| DELETE  | /api/moniteurs/:id    | Supprimer un moniteur    |

**Body POST/PUT :**
```json
{
  "prenom": "Moussa",
  "nom": "Diallo",
  "numeroPermis": "SN-2024-001",
  "telephone": "771234567",
  "email": "moussa.diallo@auto221.sn"
}
```

---

### Élèves — `/api/eleves`

| Méthode | URL               | Description           |
|---------|-------------------|-----------------------|
| POST    | /api/eleves       | Créer un élève        |
| GET     | /api/eleves       | Lister tous les élèves|
| GET     | /api/eleves/:id   | Obtenir un élève      |
| PUT     | /api/eleves/:id   | Modifier un élève     |
| DELETE  | /api/eleves/:id   | Supprimer un élève    |

**Body POST/PUT :**
```json
{
  "prenom": "Aminata",
  "nom": "Sow",
  "email": "aminata.sow@gmail.com",
  "telephone": "781234567",
  "dateNaissance": "2000-03-15",
  "moniteurId": 1
}
```

---

### Véhicules — `/api/vehicules`

| Méthode | URL                  | Description              |
|---------|----------------------|--------------------------|
| POST    | /api/vehicules       | Créer un véhicule        |
| GET     | /api/vehicules       | Lister tous les véhicules|
| GET     | /api/vehicules/:id   | Obtenir un véhicule      |
| PUT     | /api/vehicules/:id   | Modifier un véhicule     |
| DELETE  | /api/vehicules/:id   | Supprimer un véhicule    |

**Body POST/PUT :**
```json
{
  "immatriculation": "DK-1234-AA",
  "marque": "Toyota",
  "modele": "Corolla",
  "type": "VOITURE",
  "statut": "DISPONIBLE"
}
```

Types valides : `VOITURE` · `MOTO` · `CAMION`  
Statuts valides : `DISPONIBLE` · `EN_MAINTENANCE` · `HORS_SERVICE`

---

### Séances — `/api/seances`

| Méthode | URL                        | Description                  |
|---------|----------------------------|------------------------------|
| POST    | /api/seances               | Planifier une séance         |
| GET     | /api/seances               | Lister toutes les séances    |
| GET     | /api/seances/:id           | Obtenir une séance           |
| PATCH   | /api/seances/:id/statut    | Mettre à jour le statut      |
| DELETE  | /api/seances/:id           | Supprimer une séance         |

**Body POST :**
```json
{
  "dateHeure": "2025-06-15T09:00:00.000Z",
  "duree": 60,
  "eleveId": 1,
  "moniteurId": 1,
  "vehiculeId": 1
}
```

**Body PATCH statut :**
```json
{
  "statut": "EFFECTUEE"
}
```

Statuts valides : `PLANIFIEE` · `EFFECTUEE` · `ANNULEE`

---

## Règles métier appliquées

- Un moniteur ne peut pas être supprimé s'il a des élèves ou des séances
- Un élève ne peut pas être supprimé s'il a des séances PLANIFIEES
- Un véhicule ne peut pas être supprimé s'il a des séances PLANIFIEES
- Un véhicule HORS_SERVICE ou EN_MAINTENANCE ne peut pas être affecté à une séance
- Un moniteur ne peut pas avoir deux séances PLANIFIEES à la même dateHeure
- Un véhicule ne peut pas être affecté à deux séances à la même dateHeure
- La dateHeure d'une séance doit être dans le futur
- La durée d'une séance doit être un entier > 0
