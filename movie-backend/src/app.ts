// src/app.ts
import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { connectDB } from './config/database';
import authRoutes from './routes/auth';
import movieRoutes from './routes/movie';
import logger from './utils/logger';
import cors from 'cors';
import { SERVER_START } from './constants/messages';

// ✅ Load .env from root directory
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

// ✅ Connect to MongoDB
connectDB();

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());

// ✅ Route handlers
app.use('/api/auth', authRoutes);
app.use('/api/movies', movieRoutes);

// ✅ Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  logger.info(SERVER_START(PORT));
  logger.info('✅ Movie routes registered');
});
