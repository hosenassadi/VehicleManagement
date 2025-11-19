import { createApp } from './app';
import { initializeDatabase, closeDatabase } from './config/database';
import { seedDatabase } from './repositories';

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    initializeDatabase();

    await seedDatabase();

    const app = createApp();

    const server = app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📝 API: http://localhost:${PORT}/api`);
      console.log(`❤️  Health: http://localhost:${PORT}/api/health`);
    });

    process.on('SIGINT', () => {
      console.log('\n👋 Shutting down gracefully...');
      server.close(() => {
        closeDatabase();
        console.log('✅ Database connection closed');
        process.exit(0);
      });
    });

  } catch (error) {
    console.error('❌ Failed to start server:', error);
    closeDatabase();
    process.exit(1);
  }
};

startServer();