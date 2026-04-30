const app    = require('./app');
const prisma = require('./config/prisma');
const { execSync } = require('child_process');

const PORT = process.env.PORT || 3000;

async function main() {
  // Appliquer les migrations automatiquement au démarrage
  if (process.env.NODE_ENV === 'production') {
    console.log('🔄 Application des migrations...');
    execSync('npx prisma migrate deploy', { stdio: 'inherit' });
    console.log('✅ Migrations appliquées.');
  }

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