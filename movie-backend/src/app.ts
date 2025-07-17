import { env } from '../env'; // ✅ correct relative path
import express from 'express';
import path from 'path';
import { connectDB } from './config/database';
import authRoutes from './routes/auth';
import movieRoutes from './routes/movie';
import logger from './utils/logger';

connectDB(); // ✅ Connect to MongoDB

const app = express();
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/movies', movieRoutes);

const PORT = env.PORT || 5000;
app.listen(PORT, () => {
  logger.info(`🚀 Server running on http://localhost:${PORT}`);
});
