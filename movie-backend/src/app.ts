import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/database';
import authRoutes from './routes/auth';
import movieRoutes from './routes/movie';

dotenv.config();
connectDB();

const app = express();
app.use(express.json()); // Enable parsing JSON bodies

// Register route handlers
app.use('/api/auth', authRoutes);
app.use('/api/movies', movieRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
