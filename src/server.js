const app    = require('./app');
const prisma = require('./config/prisma');

const PORT = process.env.PORT || 3000;

async function main() {
  // Vérifier la connexion à la base de données
  await prisma.$connect();
  console.log('✅ Connexion base de données établie.');

  app.listen(PORT, () => {
    console.log(`🚗 AUTO 221 API démarrée sur http://localhost:${PORT}`);
    console.log(`📋 Health check : http://localhost:${PORT}/api/health`);
  });
}

main().catch((err) => {
  console.error('❌ Erreur au démarrage :', err);
  process.exit(1);
});
