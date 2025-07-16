import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { connectDB } from './config/database';
import authRoutes from './routes/auth';
import movieRoutes from './routes/movie';
import logger from './utils/logger';

// ✅ Load .env from root directory
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

// ✅ Connect to MongoDB
connectDB();

const app = express();
app.use(express.json()); // Enable parsing JSON bodies

// ✅ Route handlers
app.use('/api/auth', authRoutes);
app.use('/api/movies', movieRoutes);

// ✅ Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  logger.info(`🚀 Server running on http://localhost:${PORT}`);
});
